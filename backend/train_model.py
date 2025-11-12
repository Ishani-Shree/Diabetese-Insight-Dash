# train_model.py
# Trains a RandomForestRegressor on sklearn's diabetes dataset and writes model.joblib.

import joblib
from sklearn.datasets import load_diabetes
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import os

def main():
    print("Loading diabetes dataset...")
    X, y = load_diabetes(return_X_y=True)  # 10 numeric features
    print(f"Dataset shape: X={X.shape}, y={y.shape}")

    # Split dataset for demonstration
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    print("Training RandomForestRegressor...")
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    score = model.score(X_test, y_test)
    print(f"Trained RandomForestRegressor — R^2 on test set: {score:.4f}")

    out_path = os.path.join(os.path.dirname(__file__), 'model.joblib')
    joblib.dump(model, out_path)
    print(f"Model saved to: {out_path}")

if __name__ == '__main__':
    main()
