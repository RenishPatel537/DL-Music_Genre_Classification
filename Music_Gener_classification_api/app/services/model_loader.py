import os
import torch
from torchvision import models
import torch.nn as nn


from app.models.cnn_model import GenreCNN

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Resolve model paths relative to the project root
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


def load_models():

    cnn = GenreCNN(10)
    cnn.load_state_dict(torch.load(
        os.path.join(BASE_DIR, "saved_models", "musicmodel.pth"),
        map_location=device
    ))
    cnn.eval()

    augcnn = GenreCNN(10)
    augcnn.load_state_dict(torch.load(
        os.path.join(BASE_DIR, "saved_models", "MusicAugModel.pth"),
        map_location=device
    ))
    augcnn.eval()

    return cnn, augcnn


cnn_model, aug_model = load_models()