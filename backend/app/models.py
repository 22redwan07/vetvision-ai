import torch
import torch.nn as nn
import torchvision.models as models

from .config import MODEL_NAMES, MODELS_DIR


def get_model_architecture(model_key: str):

    if model_key == "mobilenetv2":
        return models.mobilenet_v2(weights=None)

    elif model_key == "efficientnetb0":
        return models.efficientnet_b0(weights=None)

    elif model_key == "resnet50":
        return models.resnet50(weights=None)

    elif model_key == "densenet121":
        return models.densenet121(weights=None)

    elif model_key == "convnext_tiny":
        return models.convnext_tiny(weights=None)

    else:
        raise ValueError(f"Unknown model key: {model_key}")


def load_model(model_key: str, num_classes: int, device: torch.device):

    model = get_model_architecture(model_key)

    if model_key == "mobilenetv2":
        model.classifier[1] = nn.Linear(
            model.classifier[1].in_features,
            num_classes,
        )

    elif model_key == "efficientnetb0":
        model.classifier[1] = nn.Linear(
            model.classifier[1].in_features,
            num_classes,
        )

    elif model_key == "resnet50":
        model.fc = nn.Linear(
            model.fc.in_features,
            num_classes,
        )

    elif model_key == "densenet121":
        model.classifier = nn.Linear(
            model.classifier.in_features,
            num_classes,
        )

    elif model_key == "convnext_tiny":
        model.classifier[2] = nn.Linear(
            model.classifier[2].in_features,
            num_classes,
        )

    weights_path = MODELS_DIR / MODEL_NAMES[model_key]

    if not weights_path.exists():
        raise FileNotFoundError(
            f"Weights file not found: {weights_path}"
        )

    checkpoint = torch.load(
        weights_path,
        map_location=device,
    )

    if isinstance(checkpoint, dict):

        if "model_state" in checkpoint:
            state_dict = checkpoint["model_state"]

        elif "state_dict" in checkpoint:
            state_dict = checkpoint["state_dict"]

        else:
            state_dict = checkpoint

    else:
        state_dict = checkpoint

    state_dict = {
        k.replace("module.", ""): v
        for k, v in state_dict.items()
    }

    model.load_state_dict(state_dict)

    model.to(device)
    model.eval()

    return model