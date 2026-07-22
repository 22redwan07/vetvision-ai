import cv2, numpy as np, torch
from .config import IMG_SIZE
class GradCAM:
    def __init__(self, model, target_layer):
        self.model = model; self.target_layer = target_layer
        self.gradients = None; self.activations = None
        target_layer.register_forward_hook(self.save_activation)
        target_layer.register_backward_hook(self.save_gradient)
    def save_activation(self, module, input, output): self.activations = output.detach()
    def save_gradient(self, module, grad_input, grad_output): self.gradients = grad_output[0].detach()
    def generate(self, input_tensor, class_idx=None):
        self.model.eval()
        input_tensor = input_tensor.unsqueeze(0)
        output = self.model(input_tensor)
        if class_idx is None: class_idx = torch.argmax(output, dim=1).item()
        self.model.zero_grad()
        one_hot = torch.zeros_like(output)
        one_hot[0, class_idx] = 1
        output.backward(gradient=one_hot, retain_graph=True)
        gradients = self.gradients[0]; activations = self.activations[0]
        weights = torch.mean(gradients, dim=(1,2))
        cam = torch.zeros(activations.shape[1:], dtype=torch.float32)
        for i, w in enumerate(weights): cam += w * activations[i,:,:]
        cam = torch.relu(cam)
        cam = cam / (torch.max(cam) + 1e-8)
        cam = cam.cpu().numpy()
        cam = cv2.resize(cam, (IMG_SIZE, IMG_SIZE))
        return cam, class_idx
