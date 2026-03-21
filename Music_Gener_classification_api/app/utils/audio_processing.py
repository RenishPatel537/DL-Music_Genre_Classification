import librosa
import torch


def preprocess_audio(file_path):

    y, sr = librosa.load(file_path, sr=22050)

    mel = librosa.feature.melspectrogram(
        y=y,
        sr=sr,
        n_mels=128,
    )

    mel = librosa.power_to_db(mel)

    mel = torch.tensor(mel).float()

    mel = mel.unsqueeze(0)

    if(mel.shape[2]>130):
        mel = mel[:,:,:130]
    else:
        pad = 130 - mel.shape[2]
        mel = torch.nn.functional.pad(mel, (0, pad))

    print(mel.shape)

    return mel