// src/api/predict.ts
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:8000';

export async function predict(features: number[]) {
  const res = await fetch(`${BACKEND_URL}/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ features }),
  });

  if (!res.ok) {
    // attempt to read error detail from backend
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || `Prediction failed: ${res.status}`);
  }

  const data = await res.json();
  return data.prediction as number[];
}
