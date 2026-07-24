from fastapi import APIRouter, UploadFile, File, HTTPException
import torch, numpy as np, time, base64, cv2
from ..config import CLASSES, ENSEMBLE_WEIGHTS
from ..preprocessing import preprocess_image
from ..ensemble import weighted_ensemble_predict
from ..grad_cam import GradCAM
from ..models import load_model
from ..utils import get_device

router = APIRouter(prefix="/api", tags=["prediction"])
models_cache = {}; grad_cam_cache = {}

def get_models():
    if not models_cache:
        device = get_device()
        for key in ENSEMBLE_WEIGHTS.keys():
            model = load_model(key, len(CLASSES), device)
            models_cache[key] = model
            target_layer = None
            if hasattr(model, 'layer4'): target_layer = model.layer4[-1]
            elif hasattr(model, 'features') and hasattr(model.features, '7'): target_layer = model.features[7]
            elif hasattr(model, 'classifier') and hasattr(model.classifier, '0'): target_layer = model.classifier[0]
            elif hasattr(model, 'conv_layers'): target_layer = model.conv_layers[-1]
            if target_layer is not None: grad_cam_cache[key] = GradCAM(model, target_layer)
    return models_cache

@router.post("/predict")
async def predict(file: UploadFile = File(...)):
    start_time = time.time()
    if file.content_type not in ["image/jpeg","image/png","image/jpg"]:
        raise HTTPException(400, "Only JPEG/PNG allowed")
    image_bytes = await file.read()
    try:
        img_array = preprocess_image(image_bytes)
        input_tensor = torch.tensor(img_array, dtype=torch.float32)
    except Exception as e:
        raise HTTPException(400, f"Preprocessing failed: {str(e)}")
    models_dict = get_models()
    device = get_device()
    input_tensor = input_tensor.to(device)
    probs_list = []
    with torch.no_grad():
        for key, model in models_dict.items():
            output = model(input_tensor.unsqueeze(0))
            probs = torch.softmax(output, dim=1).squeeze(0)
            probs_list.append(probs)
    ensemble_result = weighted_ensemble_predict(probs_list, ENSEMBLE_WEIGHTS)

    grad_cam = None
    # generate grad-cam if available for the model
    if "convnext_tiny" in grad_cam_cache:
        grad_cam_obj = grad_cam_cache["convnext_tiny"]
        cam, class_idx = grad_cam_obj.generate(
            input_tensor,
            class_idx=ensemble_result["class_index"]
        )
        cam_uint8 = (cam * 255).astype(np.uint8)
        cam_uint8 = cv2.applyColorMap(cam_uint8, cv2.COLORMAP_JET)
        _, buffer = cv2.imencode(".jpg", cam_uint8)
        grad_cam = base64.b64encode(buffer).decode("utf-8")

    info = {
        "Healthy": {"symptoms":"No symptoms.","description":"Healthy animal.","recommendations":"Continue regular checks.","prevention":"Vaccination."},
        "Foot-and-Mouth Disease": {"symptoms":"Fever, blisters in mouth and feet.","description":"Highly contagious viral disease.","recommendations":"Isolate, disinfect, report.","prevention":"Vaccination, quarantine."},
        "Mastitis": {"symptoms":"Swelling, redness, abnormal milk.","description":"Inflammation of the udder.","recommendations":"Antibiotic therapy, improve hygiene.","prevention":"Clean milking practices."},
        "Lumpy Skin Disease": {"symptoms":"Skin nodules, fever, nasal discharge.","description":"Viral disease causing skin nodules.","recommendations":"Supportive care, anti-inflammatory.","prevention":"Vector control, vaccination."},
        "Bovine Tuberculosis": {"symptoms":"Chronic cough, weight loss.","description":"Chronic bacterial respiratory disease.","recommendations":"Test and cull, improve biosecurity.","prevention":"Test and cull."},
        "Brucellosis": {"symptoms":"Abortion, infertility, joint pain.","description":"Bacterial infection causing reproductive failure.","recommendations":"Vaccination, test and cull.","prevention":"Vaccination, test and cull."}
    }

    disease = ensemble_result["class"]
    response = {
        "prediction": disease,
        "confidence": ensemble_result["confidence"],
        "probabilities": ensemble_result["probabilities"],
        "grad_cam": grad_cam,
        "processing_time": round(time.time()-start_time,3),
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "symptoms": info.get(disease,{}).get("symptoms",""),
        "description": info.get(disease,{}).get("description",""),
        "recommendations": info.get(disease,{}).get("recommendations",""),
        "prevention": info.get(disease,{}).get("prevention","")
    }
    return response