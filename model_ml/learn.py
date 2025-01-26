from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import cv2
import os
import numpy as np

# Ruta de tu dataset
dataset_path = "./dataset"

# Cargar imágenes y etiquetas
images = []
labels = []
for folder in os.listdir(dataset_path):
    folder_path = os.path.join(dataset_path, folder)
    for file in os.listdir(folder_path):
        img_path = os.path.join(folder_path, file)
        img = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
        img_resized = cv2.resize(img, (64, 64)).flatten()  # Redimensionar y aplanar
        images.append(img_resized)
        labels.append(folder)

# Convertir a numpy arrays
X = np.array(images)
y = np.array(labels)

# Dividir en conjunto de entrenamiento y prueba
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Entrenar modelo
clf = RandomForestClassifier()
clf.fit(X_train, y_train)

# Evaluar modelo
y_pred = clf.predict(X_test)
print(f"Precisión: {accuracy_score(y_test, y_pred)}")
import joblib

# Guardar el modelo
joblib.dump(clf, 'star_model.pkl')
