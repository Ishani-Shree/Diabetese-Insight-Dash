# app.py
# FastAPI server that loads model.joblib and exposes /health and /predict

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import os
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Sugar Insight ML API")

# Allow Vite dev server origins — adjust if needed
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = os.path.join(os.path.dirname(__file__), 'model.joblib')
model = None

class Features(BaseModel):
    features: List[float]

@app.on_event("startup")
def load_model():
    global model
    if os.path.exists(MODEL_PATH):
        model = joblib.load(MODEL_PATH)
        print("Model loaded from:", MODEL_PATH)
    else:
        model = None
        print("No model found at", MODEL_PATH)

@app.get("/health")
def health():
    return {"status": "ok", "model_loaded": model is not None}

@app.post("/predict")
def predict(payload: Features):
    global model
    if model is None:
        raise HTTPException(status_code=503, detail="Model not available. Run train_model.py to create model.joblib.")
    # Expect features as a flat list (1 sample). Convert to 2D.
    X = [payload.features]
    try:
        pred = model.predict(X)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Prediction error: {str(e)}")
    return {"prediction": pred.tolist()}
