import { useEffect } from 'react'
import videos from '../../data/videos'

export const VideoBackground = () => {
  const selectRandomVideo = () => {
    const randomIndex = Math.floor(Math.random() * videos.length)
    const videoUrl = `src/public/videos/${videos[randomIndex].video}`
    console.log(videoUrl)
    return <source type="video/mp4" src={videoUrl} id="url-video" />
  }

  useEffect(() => {
    selectRandomVideo()
  }, [])

  return (
    <video className="video url-video" autoPlay muted loop playsInline>
      {selectRandomVideo()}
    </video>
  )
}
