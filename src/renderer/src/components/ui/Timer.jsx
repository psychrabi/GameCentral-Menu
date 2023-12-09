import { useEffect, useState } from 'react'
import { useAuthStore } from '../stores/AuthStore'
import { formatTime } from '../../utils/formatTIme'
// eslint-disable-next-line react/prop-types
export const Timer = () => {
  const { start_time, member, logout, setNotification } = useAuthStore()
  const [durationString, setDurationString] = useState('00:00:00')
  // const [sessionDuration, setSessionDuration] = useState(0)
  const [cost, setCost] = useState('0.00')

  const COST_PER_HOUR = 60

  const startTimeString = new Date(parseInt(start_time)).toLocaleTimeString()

  useEffect(() => {
    const durationInSeconds = calculateDurationInSeconds()

    const cost = calculateCost(durationInSeconds)
    setCost(cost)

    // console.log(sessionDuration)

    const intervalId = setInterval(() => {
      // Calculate the duration of the session in seconds
      const durationInSeconds = calculateDurationInSeconds()
      const string = formatTime(durationInSeconds.toFixed(0))
      setDurationString(string)
    }, 5000)

    const intervalId2 = setInterval(() => {
      const durationInSeconds = calculateDurationInSeconds()

      const cost = calculateCost(durationInSeconds)
      setCost(cost)
    }, 15000)

    const intervalId3 = setInterval(() => {
      if (cost > member.balance + member.bonus_balance) {
        setNotification(
          'Your session cost is higher than balance. Difference will be added to credit'
        )
      }
      if (cost > member.balance + member.bonus_balance + 30) {
        setNotification(
          'Your credit is more than 30. You will be logged out shortly and will not be able to login before clearing your credit.'
        )
        logout(COST_PER_HOUR)
      }
    }, 60000)

    // if (sessionType == 'balance') {
    //   setSessionDuration(
    //     (((member?.balance + member?.bonus_balance) / COST_PER_HOUR) * (60 * 60) * 1000).toFixed(0)
    //   ) //in milliseconds
    // }

    // Clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId)
      clearInterval(intervalId2)
      clearInterval(intervalId3)
    }
  }, [])

  const calculateDurationInSeconds = () => {
    return (Date.now() - start_time) / 1000
  }

  const calculateCost = (durationInSeconds) => {
    const durationInHours = durationInSeconds / (60 * 60)
    return (durationInHours * COST_PER_HOUR).toFixed(2)
  }

  return (
    <ul className="nav col-8 col-md-8 col-lg-auto me-lg-auto mb-2 mb-md-0 justify-content-md-end">
      <li className="me-3">
        <span className="fw-bold">Start at :</span> {startTimeString}
      </li>
      <li className="me-3">
        <span className="fw-bold">Duration : </span> {durationString}
      </li>
      <li>
        <span className="fw-bold">Session Cost: </span> $ {cost}
      </li>
    </ul>
  )
}
