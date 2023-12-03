import { useRef, useState } from 'react'
import videos from '../../data/videos'

export const VideoBackground = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const videoRef = useRef(null)

  const selectRandomVideo = () => {
    const videoUrl = `src/public/videos/${videos[currentVideoIndex]}`
    console.log(videoUrl)
    return <source type="video/mp4" src={videoUrl} id="url-video" />
  }

  const handleVideoEnd = () => {
    // Choose the next video index
    setCurrentVideoIndex(Math.floor(Math.random() * videos.length))
    // console.log('video ended')

    // Reset currentTime to 0 and load the new video
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.load()
    }
  }

  return (
    <video
      className="video url-video"
      autoPlay
      muted
      playsInline
      ref={videoRef}
      onEnded={handleVideoEnd}
    >
      {selectRandomVideo()}
    </video>
  )
}
