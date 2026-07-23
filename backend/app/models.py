import torch
import torch.nn as nn
import torchvision.models as models
from .config import MODEL_NAMES, MODELS_DIR

def get_model_architecture(model_key: str):
    if model_key == "custom_cnn": return CustomCNN()
    elif model_key == "mobilenetv2": return models.mobilenet_v2(weights=None)
    elif model_key == "efficientnetb0": return models.efficientnet_b0(weights=None)
    elif model_key == "resnet50": return models.resnet50(weights=None)
    elif model_key == "densenet121": return models.densenet121(weights=None)
    elif model_key == "convnext_tiny": return models.convnext_tiny(weights=None)
    else: raise ValueError(f"Unknown model key: {model_key}")

def load_model(model_key: str, num_classes: int, device: torch.device):
    model = get_model_architecture(model_key)
    if model_key == "custom_cnn": pass
    elif model_key == "mobilenetv2": model.classifier[1] = nn.Linear(model.classifier[1].in_features, num_classes)
    elif model_key == "efficientnetb0": model.classifier[1] = nn.Linear(model.classifier[1].in_features, num_classes)
    elif model_key == "resnet50": model.fc = nn.Linear(model.fc.in_features, num_classes)
    elif model_key == "densenet121": model.classifier = nn.Linear(model.classifier.in_features, num_classes)
    elif model_key == "convnext_tiny": model.classifier[2] = nn.Linear(model.classifier[2].in_features, num_classes)
    weights_path = MODELS_DIR / MODEL_NAMES[model_key]
    if not weights_path.exists(): raise FileNotFoundError(f"Weights file not found: {weights_path}")
    state_dict = torch.load(weights_path, map_location=device)
    model.load_state_dict(state_dict)
    model.to(device)
    model.eval()
    return model

class CustomCNN(nn.Module):
    def __init__(self, num_classes=6):
        super(CustomCNN, self).__init__()
        self.conv_layers = nn.Sequential(
            nn.Conv2d(3,32,3,padding=1), nn.ReLU(), nn.MaxPool2d(2,2),
            nn.Conv2d(32,64,3,padding=1), nn.ReLU(), nn.MaxPool2d(2,2),
            nn.Conv2d(64,128,3,padding=1), nn.ReLU(), nn.MaxPool2d(2,2),
            nn.Conv2d(128,256,3,padding=1), nn.ReLU(), nn.MaxPool2d(2,2),
        )
        self.fc = nn.Sequential(nn.Dropout(0.5), nn.Linear(256*14*14,512), nn.ReLU(), nn.Dropout(0.3), nn.Linear(512,num_classes))
    def forward(self,x):
        x = self.conv_layers(x)
        x = x.view(x.size(0), -1)
        x = self.fc(x)
        return x
