function applyThreshold(imageData) {
    const { data } = imageData
    const binaryImage = new Uint8Array(data.length / 4)
    const threshold = 128
  
    for (let i = 0; i < data.length; i += 4) {
      binaryImage[i / 4] = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114 > threshold ? 255 : 0
    }
  
    return binaryImage
  }
  
  function detectEdges(image, width, height) {
    const edges = new Uint8Array(image.length)
    const offsets = [-width - 1, -width, -width + 1, -1, 1, width - 1, width, width + 1]
  
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const index = y * width + x
        edges[index] = offsets.some((offset) => image[index + offset] !== image[index]) ? 255 : 0
      }
    }
    return edges
  }
  
  function normalizeStarCoordinates(stars, width, height) {
    const normalizedStars = {}
    for (const [type, starList] of Object.entries(stars)) {
      normalizedStars[type] = starList.map((star) => ({
        x: star.x / width,
        y: star.y / height,
        radius: star.radius / Math.min(width, height),
      }))
    }
    return normalizedStars
  }
  
  export function detectStars(imageData) {
    const { data, width, height } = imageData
    // ... (código existente para la detección de estrellas,  ejemplo placeholder)
    const detectedStars = {
      fivePoint: [],
    }
  
    // Ejemplo de detección de estrellas (reemplazar con la lógica real)
    for (let i = 0; i < 10; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      const radius = Math.random() * 10
      const points = Math.floor(Math.random() * 3) + 4 // 4, 5 o 6 puntos
      detectedStars[`${points}Point`].push({ x, y, radius })
    }
  
    return normalizeStarCoordinates(detectedStars, width, height)
  }
  
  