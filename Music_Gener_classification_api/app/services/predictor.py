import torch
import librosa
import numpy as np

genres = [
"blues","classical","country","disco","hiphop",
"jazz","metal","pop","reggae","rock"
]


# {'blues': 0, 'classical': 1, 'country': 2, 'disco': 3, 'hiphop': 4, 'jazz': 5, 'metal': 6, 'pop': 7, 'reggae': 8, 'rock': 9}



def predict_full_song_overlap(model, audio_path):

    sr = 22050
    segment_frames = 130
    hop_frames = 65

    #Load audio
    y, sr = librosa.load(audio_path, sr=sr)

    #Create Mel Spectrogram
    mel = librosa.feature.melspectrogram(
        y=y,
        sr=sr,
        n_mels=128
    )

    #Convert to log scale
    mel_db = librosa.power_to_db(mel, ref=np.max)

    #Create overlapping segments
    segments = []
    total_frames = mel_db.shape[1]

    for start in range(0, total_frames - segment_frames, hop_frames):

        segment = mel_db[:, start:start+segment_frames]
        segments.append(segment)

    segments = np.array(segments)

    #Convert to tensor
    segments = torch.tensor(segments).unsqueeze(1).float()

    # # Detect model type
    # model_name = model.__class__.__name__

    # if model_name == "ResNet":
    #     segments = segments.repeat(1,3,1,1)

    # shape → (num_segments,1,128,130)

    #Predict
    model.eval()
    with torch.no_grad():

        outputs = model(segments)

        probs = torch.softmax(outputs, dim=1)

        avg_probs = torch.mean(probs, dim=0)

        pred_class = torch.argmax(avg_probs)

        avg_probs = round(avg_probs[pred_class.item()].item(),5)

        print("avg prob:",avg_probs)
        print(pred_class.item())

    return genres[pred_class.item()], avg_probs