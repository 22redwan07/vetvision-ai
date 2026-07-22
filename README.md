# VetVision AI â€“ AI-Based Cattle Disease Detection

## Overview
VetVision AI is an ensemble deep learning web application for detecting cattle diseases from images. It uses six CNN models (Custom CNN, MobileNetV2, EfficientNetB0, ResNet50, DenseNet121, ConvNeXt Tiny) with weighted ensemble, Grad-CAM visualization, and a modern React frontend.

## Features
- Image upload (drag & drop)
- Ensemble prediction (weighted average)
- Confidence scores and disease details
- Grad-CAM heatmap for interpretability
- Responsive medical-grade UI

## Setup
1. Run scripts/setup.ps1 to create venv and install dependencies.
2. Copy your six trained .pth model files into ackend/models/ with exact names:
   - custom_cnn_best.pth
   - mobilenetv2_best.pth
   - efficientnetb0_best.pth
   - resnet50_best.pth
   - densenet121_best.pth
   - convnext_tiny_best.pth
3. Run scripts/run.ps1 to start both backend and frontend.
4. Open http://localhost:3000

## Deployment
- Frontend: Vercel (see deployment/vercel.json)
- Backend: Render (see deployment/render.yaml)

## License
MIT
