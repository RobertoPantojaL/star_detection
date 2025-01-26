import React, { useState, useRef } from "react"
import { detectStars } from "./utils/starDetection.js"
import "./App.css"
const App = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [stars, setStars] = useState({})
  const canvasRef = useRef(null)
  const fileInputRef = useRef(null)

  const handleImageUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    setIsLoading(true)
    setError(null)
    setResult(null)
    setStars({})

    try {
      const img = await createImageBitmap(file)
      const canvas = canvasRef.current
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext("2d")
      ctx.drawImage(img, 0, 0)

      // Obtener la predicción desde el servidor Flask
      const prediction = await getPrediction(file)

      // Mostrar el resultado de la predicción
      setResult(prediction.message)

      // Usar las estrellas detectadas por el servidor
      setStars(prediction.stars)
      drawDetections(ctx, prediction.stars)
    } catch (error) {
      console.error("Error al procesar la imagen:", error)
      setError(`Error al procesar la imagen: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const getPrediction = async (file) => {
    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error || "Unknown error"}`)
    }

    return await response.json()
  }

  const drawDetections = (ctx, stars) => {
    const colors = {
    }

    Object.entries(stars).forEach(([starType, starList]) => {
      ctx.strokeStyle = colors[starType]
      ctx.lineWidth = 2
      starList.forEach((star) => {
        const x = star.x * ctx.canvas.width
        const y = star.y * ctx.canvas.height
        const radius = star.radius * Math.min(ctx.canvas.width, ctx.canvas.height)
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, 2 * Math.PI)
        ctx.stroke()
      })
    })
  }

  return (
    <div className="App">
      <h1>Detector de Sellos de Estrella</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} ref={fileInputRef} style={{ display: "none" }} />
      <button onClick={() => fileInputRef.current?.click()}>Cargar Imagen</button>
      <canvas ref={canvasRef} style={{ marginTop: "20px", maxWidth: "100%" }} />
      {isLoading && <p>Procesando imagen...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {result && (
        <div>
          <p>{result}</p>
          <ul>
          </ul>
        </div>
      )}
    </div>
  )
}

export default App

