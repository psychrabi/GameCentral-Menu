import { useEffect, useRef, useState } from 'react'
import videos from '../../../data/videos'

const VideoBackground = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(1)
  const videoRef = useRef(null)

  useEffect(() => {
    const handleVideoEnd = () => {
      const nextVideoIndex = Math.floor(Math.random() * videos.length)
      if (videoRef.current) {
        videoRef.current.src = `../src/public/videos/${videos[nextVideoIndex]}`
        videoRef.current.play()
      }
      setCurrentVideoIndex(nextVideoIndex)
    }

    const videoElement = videoRef.current
    if (videoElement) {
      videoElement.addEventListener('ended', handleVideoEnd)
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('ended', handleVideoEnd)
      }
    }
  }, [])

  return (
    <video className="video url-video" autoPlay muted playsInline ref={videoRef}>
      <source
        type="video/mp4"
        src={`../src/public/videos/${videos[currentVideoIndex]}`}
        id="url-video"
      />
    </video>
  )
}

export default VideoBackground
