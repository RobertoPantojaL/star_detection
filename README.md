# Detector de Sellos de Estrella

Este proyecto consiste en una aplicación web para detectar y clasificar sellos de estrella en imágenes. Utiliza una API de Python (Flask) para el procesamiento de imágenes y la clasificación, y un frontend en React (Vite) para la interfaz de usuario.

## Estructura del Proyecto

- `apiflask/`: Contiene el código de la API de Python (Flask)
- `verify/`: Contiene el código del frontend en React (Vite)
- `model_ml/`: Contiene el código para entrenar el modelo y el dataset
  - `learn.py`: Script para entrenar el modelo
  - `dataset/`: Carpeta con las imágenes de entrenamiento
    - `estrella/`: Imágenes de sellos con estrellas
    - `no_estrella/`: Imágenes de sellos sin estrellas

## Requisitos

- Python 3.7+
- Node.js 14+
- npm 6+

## Instalación y Configuración

### Backend (API de Python)

1. Navega al directorio de la API:
   ```
   cd apiflask
   ```

2. Instala las dependencias globalmente:
   ```
   pip install flask flask-cors joblib numpy pillow opencv-python-headless scikit-learn
   ```

3. Asegúrate de que el archivo `star_model.pkl` esté en el directorio `api/`.

### Frontend (React con Vite)

1. Navega al directorio del frontend:
   ```
   cd frontend
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

### Entrenamiento del Modelo

1. Navega al directorio `model_ml/`:
   ```
   cd model_ml
   ```

2. Asegúrate de que tu dataset esté organizado en las carpetas `dataset/estrella/` y `dataset/no_estrella/`.

3. Ejecuta el script de entrenamiento:
   ```
   python learn.py
   ```

4. El modelo entrenado se guardará como `star_model.pkl` en el directorio actual.

5. Mueve el archivo `star_model.pkl` al directorio `api/`.

## Ejecución del Proyecto

### Backend

1. Desde el directorio `apiflask/`, ejecuta:
   ```
   python model_server.py
   ```
   
   El servidor Flask se iniciará en `http://127.0.0.1:5000`.

### Frontend

1. Desde el directorio `verify/`, ejecuta:
   ```
   npm run dev
   ```
   
   La aplicación de Vite se iniciará y estará disponible en `http://localhost:5173` (o el puerto que Vite asigne).

2. Abre tu navegador y visita la URL proporcionada por Vite para usar la aplicación.

## Uso

1. En la interfaz web, haz clic en "Cargar Imagen" para seleccionar una imagen de un sello de estrella.
2. La imagen se enviará a la API para su procesamiento.
3. Los resultados de la detección y clasificación se mostrarán en la pantalla.

## Notas Adicionales

- Asegúrate de que tanto el backend como el frontend estén ejecutándose simultáneamente para el funcionamiento correcto de la aplicación.
- El modelo de detección de estrellas espera imágenes de 64x64 píxeles. Las imágenes se redimensionarán automáticamente en el servidor.
- Al no usar un entorno virtual, las dependencias de Python se instalan globalmente. Ten en cuenta que esto podría causar conflictos con otros proyectos que utilicen versiones diferentes de las mismas bibliotecas.
- El script de entrenamiento (`learn.py`) utiliza un clasificador Random Forest. Puedes ajustar los parámetros del modelo o probar otros algoritmos modificando este script.

## Solución de Problemas

- Si encuentras errores relacionados con CORS, asegúrate de que la configuración de CORS en el servidor Flask sea correcta y permita solicitudes desde la URL de tu aplicación frontend.
- Si el modelo no se carga correctamente, verifica que el archivo `star_model.pkl` esté presente en el directorio correcto y sea compatible con la versión de scikit-learn instalada.
- Si experimentas problemas con las dependencias de Python, considera usar un entorno virtual para aislar las dependencias del proyecto.
- Si el rendimiento del modelo no es satisfactorio, considera aumentar el tamaño del dataset o experimentar con diferentes algoritmos de aprendizaje automático.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue para discutir cambios mayores antes de crear un pull request.

## Licencia

[MIT](https://choosealicense.com/licenses/mit/)