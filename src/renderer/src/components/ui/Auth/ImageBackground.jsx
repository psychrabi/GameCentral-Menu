import React, { useEffect, useState } from 'react'
import { Card, CardMedia } from '@mui/material'

const ImageBackground = () => {
  const [images, setImages] = useState([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const importImages = async () => {
      const importedImages = await Promise.all(
        Object.values(import.meta.glob('/src/public/backgrounds/*.{webp,png,jpg,jpeg,gif}')).map(
          async (importer) => {
            const module = await importer()
            return module.default
          }
        )
      )

      setImages(importedImages)
    }

    importImages()

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <Card sx={{ position: 'absolute', top: 0, left: 0, height: '100vh', width: '100vw' }}>
      <CardMedia image={images[currentImageIndex]} height="100%" component={'img'} />
    </Card>
  )
}

export default ImageBackground
