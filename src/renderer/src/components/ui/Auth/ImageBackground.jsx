import { useEffect, useMemo, useState } from 'react'
import backgrounds from '../../../data/Backgrounds'
import { Card, CardMedia } from "@mui/material"
const ImageBackground = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(Math.floor(Math.random() * backgrounds.length))
    }, 10000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const backgroundStyle = useMemo(
    () => (
      `../src/public/backgrounds/bg-${currentImageIndex}.jpg`
    ),
    [currentImageIndex]
  )

  return (
    <Card sx={{ position: 'absolute', top: 0, left: 0, height: '100vh', width: '100vw' }} >
      <CardMedia image={backgroundStyle} height="100%" component={'img'} />
    </Card>
  )
}

export default ImageBackground
