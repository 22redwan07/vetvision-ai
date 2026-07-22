import os
from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent.parent
MODELS_DIR = BASE_DIR / "models"
MODEL_NAMES = {
    "custom_cnn": "custom_cnn_best.pth",
    "mobilenetv2": "mobilenetv2_best.pth",
    "efficientnetb0": "efficientnetb0_best.pth",
    "resnet50": "resnet50_best.pth",
    "densenet121": "densenet121_best.pth",
    "convnext_tiny": "convnext_tiny_best.pth",
}
ENSEMBLE_WEIGHTS = {
    "custom_cnn": 0.15,
    "mobilenetv2": 0.15,
    "efficientnetb0": 0.20,
    "resnet50": 0.20,
    "densenet121": 0.15,
    "convnext_tiny": 0.15,
}
CLASSES = ["Healthy","Foot-and-Mouth Disease","Mastitis","Lumpy Skin Disease","Bovine Tuberculosis","Brucellosis"]
IMG_SIZE = 224
MEAN = [0.485,0.456,0.406]
STD = [0.229,0.224,0.225]
GRAD_CAM_LAYER = "layer4"
