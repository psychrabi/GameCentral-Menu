export const formatTime = (d) => {
  // Set the duration state to the number of hours, minutes, and seconds
  if (isNaN(d)) return '00:00:00'
  d = Number(d)
  const h = Math.floor(d / 3600)
  const m = Math.floor((d % 3600) / 60)
  const s = Math.floor((d % 3600) % 60)
  // eslint-disable-next-line prettier/prettier
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s
    .toString()
    .padStart(2, '0')}`
}
