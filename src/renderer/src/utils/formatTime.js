export const formatTime = (d) => {
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
