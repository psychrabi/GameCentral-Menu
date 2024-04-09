import { useEffect, useMemo, useState } from 'react'
import { useBoundStore } from '../components/stores/BoundStore'

export default function useCost(COST_PER_HOUR) {
  const start_time = useBoundStore((state) => state.start_time)
  const UPDATE_COST_INTERVAL = 5000

  const durationInSeconds = useMemo(() => {
    return (Date.now() - start_time) / 1000
  }, [start_time])

  const [cost, setCost] = useState('0.00')

  const calculateCost = (durationInSeconds) => {
    const durationInHours = durationInSeconds / (60 * 60)
    return (durationInHours * COST_PER_HOUR).toFixed(2)
  }

  useEffect(() => {
    const update = () => {
      const newCost = calculateCost(durationInSeconds)
      setCost(newCost)
    }

    const interval = setInterval(update, UPDATE_COST_INTERVAL)
    update()

    return () => clearInterval(interval)
  }, [durationInSeconds])

  return {
    cost
  }
}
