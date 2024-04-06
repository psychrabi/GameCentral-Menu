import { useEffect, useState } from 'react'
import { useBoundStore } from '../stores/BoundStore'
import { List, ListItem, Typography } from '@mui/material'
import { formatTime } from '../../utils/formatTime'

const Timer = () => {
  const member = useBoundStore((state) => state.member)
  const start_time = useBoundStore((state) => state.start_time)
  const logout = useBoundStore((state) => state.logout)
  const setNotification = useBoundStore((state) => state.setNotification)
  const [duration, setDuration] = useState('00:00:00')
  const [cost, setCost] = useState('0.00')
  const COST_PER_HOUR = 60
  const UPDATE_INTERVAL = 5000
  const NOTIFICATION_THRESHOLD = 30

  const startTimeFormatted = new Date(parseInt(start_time)).toLocaleTimeString()

  const calculateSessionCost = (secondsElapsed) => {
    const hoursElapsed = secondsElapsed / 3600
    return (hoursElapsed * COST_PER_HOUR).toFixed(2)
  }

  const updateTimer = () => {
    const secondsElapsed = (Date.now() - start_time) / 1000
    setDuration(formatTime(secondsElapsed))
    setCost(calculateSessionCost(secondsElapsed))
  }

  const checkCostAndNotify = () => {
    if (cost > member.balance + member.bonus_balance) {
      setNotification(
        'Your session cost is higher than your balance. The difference will be added to your credit.'
      )
    }
    if (cost > member.balance + member.bonus_balance + NOTIFICATION_THRESHOLD) {
      setNotification(
        'Your credit is over $30. You will be logged out shortly and will not be able to log in until your credit is cleared.'
      )
      logout()
    }
  }

  useEffect(() => {
    const durationInterval = setInterval(updateTimer, UPDATE_INTERVAL)
    const costNotificationInterval = setInterval(checkCostAndNotify, UPDATE_INTERVAL)

    if (Date.now() - start_time > 3000) {
      const secondsElapsed = (Date.now() - start_time) / 1000
      setDuration(formatTime(secondsElapsed))
      setCost(calculateSessionCost(secondsElapsed))
    }

    return () => {
      clearInterval(durationInterval)
      clearInterval(costNotificationInterval)
    }
  }, [])

  return (
    <List component={'nav'} sx={{display: 'flex', justifyContent: 'space-between', flexGrow: 1}} > 
      
      <ListItem><Typography>Start Time:</Typography> {startTimeFormatted}</ListItem>
      <ListItem><Typography>Duration:</Typography> {duration}</ListItem>
      <ListItem><Typography>Session Cost:</Typography> $ {cost}</ListItem>
    </List>
  )
}

export default Timer
