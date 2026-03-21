import torch
from torchvision import models
import torch.nn as nn


from app.models.cnn_model import GenreCNN

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")


def load_models():

    cnn = GenreCNN(10)
    cnn.load_state_dict(torch.load("saved_models/musicmodel.pth", map_location=device))
    cnn.eval()

    augcnn = GenreCNN(10)
    cnn.load_state_dict(torch.load("saved_models/MusicAugModel.pth", map_location=device))
    cnn.eval()

    resnet = models.resnet18(weights=models.ResNet18_Weights.DEFAULT)
    resnet.fc = nn.Linear(resnet.fc.in_features,10)
    resnet.load_state_dict(torch.load("saved_models/best_resnet18.pth", map_location=device))
    resnet.eval()

    return cnn,augcnn,resnet


cnn_model,aug_model,resnet_model = load_models()