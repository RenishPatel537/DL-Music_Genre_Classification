import torch.nn as nn
from torchvision import models

class ResNet18Genre(nn.Module):

    def __init__(self, num_classes=10):

        super().__init__()

        self.model = models.resnet18(weights=models.ResNet18_Weights.DEFAULT)

        self.model.fc = nn.Linear(
            self.model.fc.in_features,
            num_classes
        )

    def forward(self, x):
        return self.model(x)