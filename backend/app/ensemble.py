import torch, numpy as np
from .config import ENSEMBLE_WEIGHTS, CLASSES
def weighted_ensemble_predict(probs_list: list, weights: dict) -> dict:
    probs_np = [p.cpu().numpy() if torch.is_tensor(p) else p for p in probs_list]
    weighted_sum = np.zeros(probs_np[0].shape)
    for i, probs in enumerate(probs_np):
        model_key = list(weights.keys())[i]
        weighted_sum += weights[model_key] * probs
    weighted_sum = weighted_sum / np.sum(weighted_sum)
    predicted_class_idx = int(np.argmax(weighted_sum))
    predicted_class = CLASSES[predicted_class_idx]
    confidence = float(np.max(weighted_sum))
    all_probs = {CLASSES[i]: float(weighted_sum[i]) for i in range(len(CLASSES))}
    return {"class": predicted_class, "class_index": predicted_class_idx, "confidence": confidence, "probabilities": all_probs}
