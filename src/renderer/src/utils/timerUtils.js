/**
 * Formats the time elapsed since the given start time.
 *
 * @param {number} start_time - The start time in milliseconds
 * @return {string} The formatted time in days, hours, minutes, and seconds
 */
export const formatTime = (start_time) => {
  const d = getTimeInSeconds(start_time)

  if (isNaN(d)) return '00:00:00'

  const days = Math.floor(d / 86400)
  const hours = Math.floor((d % 86400) / 3600)
    .toString()
    .padStart(2, '0')
  const minutes = Math.floor((d % 3600) / 60)
    .toString()
    .padStart(2, '0')
  const seconds = Math.floor(d % 60)
    .toString()
    .padStart(2, '0')

  if (days > 0) {
    return `${days}d ${hours}:${minutes}:${seconds}`
  } else {
    return `${hours}:${minutes}:${seconds}`
  }
}

export const getTimeInSeconds = (start_time) => {
  return (Date.now() - start_time) / 1000
}

/**
 * Calculates the cost based on the elapsed time and cost per hour.
 *
 * @param {number} elapsedTime - the elapsed time in seconds
 * @param {number} costPerHour - the cost per hour
 * @return {string} the calculated cost with 2 decimal places
 */
export const calculateCost = (start_time, costPerHour) => {
  const elapsedTime = getTimeInSeconds(start_time)
  const elapsedTimeInHours = elapsedTime / (60 * 60)

  return (elapsedTimeInHours * costPerHour).toFixed(2)
}
