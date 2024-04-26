import { useCallback, useEffect, useState } from 'react'
import { useBoundStore } from '../stores/BoundStore'
import { List, ListItem, Typography } from '@mui/material'
import { formatTime, calculateCost } from '../../utils/timerUtils'
import { useNavigate } from 'react-router-dom'

const Timer = () => {
  const navigate = useNavigate()
  const { member, start_time, setAlert, setMessages, reset } = useBoundStore((state) => ({
    member: state.member,
    start_time: state.start_time,
    setAlert: state.setAlert,
    setMessages: state.setMessages,
    reset: state.reset
  }))
  const [duration, setDuration] = useState('00:00:00')
  const [cost, setCost] = useState('0.00')
  const COST_PER_HOUR = 60
  const UPDATE_INTERVAL = 5000
  const COST_UPDATE_INTERVAL = 60000
  const NOTIFICATION_THRESHOLD = 30

  const startTimeFormatted = new Date(parseInt(start_time)).toLocaleTimeString()

  const checkCostAndNotify = useCallback(() => {
    const currentCost = parseFloat(cost)
    const totalBalance = member.balance + member.bonus_balance
    if (currentCost > totalBalance) {
      setMessages(
        'Your session cost is higher than your balance. The difference will be added to your credit.'
      )
      setAlert('info')
    }
    if (currentCost > totalBalance + NOTIFICATION_THRESHOLD) {
      setMessages(
        'Your credit is over $30. You will be logged out shortly and will not be able to log in until your credit is cleared.'
      )
      setAlert('error')
      navigate('/')
    }
  }, [cost])

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(formatTime(start_time))
      setCost(calculateCost(start_time, COST_PER_HOUR))
      checkCostAndNotify()
    }, UPDATE_INTERVAL)

    return () => {
      clearInterval(interval)
    }
  }, [start_time])
  return (
    <List component={'nav'} sx={{ display: 'flex', justifyContent: 'space-between', flexGrow: 1 }}>
      <ListItem>
        <Typography>Start Time:</Typography> {startTimeFormatted}
      </ListItem>
      <ListItem>
        <Typography>Duration:</Typography> {duration}
      </ListItem>
      <ListItem>
        <Typography>Session Cost:</Typography> $ {cost}
      </ListItem>
    </List>
  )
}

export default Timer
