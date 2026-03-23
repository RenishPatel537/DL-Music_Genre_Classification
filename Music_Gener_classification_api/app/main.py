from fastapi import FastAPI
from app.api.route import router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Music Genre Classification API",
    description="Predict music genre using multiple deep learning models",
    version="1.0"
)

origins = [
    "http://localhost:5173",   # React / Next.js
    "http://127.0.0.1:5173",
    "https://dl-music-genre-classification-1.onrender.com/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)