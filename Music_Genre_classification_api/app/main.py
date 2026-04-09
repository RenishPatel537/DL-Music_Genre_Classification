from fastapi import FastAPI
from app.api.route import router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Music Genre Classification API",
    description="Predict music genre using multiple deep learning models",
    version="1.0"
)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)