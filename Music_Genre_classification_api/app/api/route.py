from fastapi import APIRouter, UploadFile, File
import tempfile

from app.services.model_loader import cnn_model, aug_model
from app.services.predictor import predict_full_song_overlap
from app.utils.audio_processing import preprocess_audio

router = APIRouter()


@router.post("/predict")

async def predict_genre(file: UploadFile = File(...)):

    with tempfile.NamedTemporaryFile(delete=False) as tmp:
        tmp.write(await file.read())
        audio_path = tmp.name

    cnn_pred = predict_full_song_overlap(cnn_model, audio_path)
    aug_pred = predict_full_song_overlap(aug_model, audio_path)

    return {
        "cnn_prediction": {"genre":cnn_pred[0],"probability":cnn_pred[1]},
        "augmented_cnn_prediction": {"genre":aug_pred[0],"probability":aug_pred[1]}
    }