import { Backdrop, CircularProgress } from '@mui/material'
import { useState } from 'react'

const Loading = () => {
  const [open, setOpen] = useState(true)
  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => {
    setOpen(true)
  }
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default Loading
