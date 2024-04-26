import { useEffect, useMemo, useState } from 'react'
import backgrounds from '../../../data/Backgrounds'
import { Card, CardMedia } from "@mui/material"
const ImageBackground = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(Math.floor(Math.random() * backgrounds.length))
    }, 10000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <Card sx={{ position: 'absolute', top: 0, left: 0, height: '100vh', width: '100vw' }} >
      <CardMedia image={backgrounds[currentImageIndex].url} height="100%" component={'img'} itemType='image/webp' />
    </Card>
  )
}

export default ImageBackground
