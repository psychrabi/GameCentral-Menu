export const formatTime = (d) => {
  if (isNaN(d)) return '00:00:00';
  const h = Math.floor(d / 3600).toString().padStart(2, '0');
  const m = Math.floor((d % 3600) / 60).toString().padStart(2, '0');
  const s = Math.floor(d % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}
