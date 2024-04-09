import { useMemo } from 'react'
import { formatTime } from '../utils/formatTime'

export default function useDuration(startTime) {
  const durationInSeconds = useMemo(() => {
    return (Date.now() - startTime) / 1000
  }, [startTime])

  const [durationString, setDurationString] = useState('00:00:00')

  useEffect(() => {
    const update = () => {
      const string = formatTime(durationInSeconds)
      setDurationString(string)
    }

    const interval = setInterval(update, UPDATE_DURATION_INTERVAL)
    update()

    return () => clearInterval(interval)
  }, [durationInSeconds])

  return {
    durationString
  }
}
