import { useEffect, useMemo, useState } from 'react'
import { useAuthStore } from '../stores/AuthStore'

const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

// eslint-disable-next-line react/prop-types
export const Timer = () => {
  const start_time = useAuthStore((state) => state.start_time)
  const parsedStartTime = useMemo(() => Date.parse(start_time), [start_time])
  const [time, setTime] = useState(Date.now() - parsedStartTime)


  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now() - parsedStartTime), 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="timer">
      {Object.entries({
        Hours: (time / HOUR) % 24,
        Minutes: (time / MINUTE) % 60,
        Seconds: (time / SECOND) % 60
      }).map(([label, value]) => (
        <div key={label} className="col-4">
          <div className="box">
            <p>{`${Math.floor(value)}`.padStart(2, '0')}</p>
            <span className="text">{label}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
