import { useEffect, useRef, useState } from 'react'
import backgrounds from '../../data/Backgrounds'

const ImageBackground = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const backgroundStyle = {
    backgroundImage: `url('../src/public/backgrounds/bg-${currentImageIndex}.jpg')`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: '100%'
  }

  const handleImageEnd = () => {
    // Choose the next video index
    const index = Math.floor(Math.random() * backgrounds.length)
    setCurrentImageIndex(index + 1)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      handleImageEnd()
    }, 2000)

    return () => {
      clearInterval(timer)
      console.log('timeout cleared')
    }
  }, [])

  return (
    <>
      <div className="position-absolute top-0 left-0 h-100 w-100">
        <div style={backgroundStyle}></div>
      </div>
    </>
  )
}

export default ImageBackground
