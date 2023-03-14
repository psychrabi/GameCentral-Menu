import { useState, useEffect } from 'react'

export const ImageBackground = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        if (prevIndex === images?.length - 1) {
          return 0
        } else {
          return prevIndex + 1
        }
      })
    }, 15000)

    return () => clearInterval(intervalId)
  }, [images])

  const currentImage = images[currentImageIndex]

  const style = {
    backgroundImage: `url(${currentImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh'
  }

  return <img style={style} />
}
