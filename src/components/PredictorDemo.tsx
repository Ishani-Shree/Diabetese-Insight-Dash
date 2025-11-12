// src/components/PredictorDemo.tsx
import React, { useState } from 'react';
import { predict } from '../api/predict';

export default function PredictorDemo() {
  const [result, setResult] = useState<number[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Example 10-feature vector (diabetes demo). Replace with real inputs/UI as needed.
  const sampleFeatures = [0.0380759064,0.0506801187,0.0616962065,0.0218723550,-0.0442234984,-0.0348207628,-0.0434008457,-0.0025922620,0.0199084209,-0.0176461252];

  async function handlePredict() {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const res = await predict(sampleFeatures);
      setResult(res);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 rounded shadow bg-white">
      <h3 className="text-lg font-semibold mb-2">Predictor Demo</h3>

      <p className="text-sm mb-3">Calls backend at <code>{import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:8000'}</code></p>

      <button
        onClick={handlePredict}
        className="px-4 py-2 rounded bg-sky-600 text-white"
        disabled={loading}
      >
        {loading ? 'Predicting…' : 'Get Prediction'}
      </button>

      {error && <div className="mt-3 text-red-600">Error: {error}</div>}

      {result && (
        <div className="mt-3">
          <strong>Prediction:</strong>
          <pre className="bg-gray-100 p-2 rounded mt-1">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
