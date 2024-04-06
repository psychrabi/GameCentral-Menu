import { Navigate, Outlet } from 'react-router-dom'
import logo from '/logo.png'
import { useBoundStore } from './stores/BoundStore'
import SystemInfo from './ui/SystemInfo'
import { lazy, useContext, useEffect, useMemo } from 'react'
import notificationContext from '../context/NotificationContext'
import { Box } from '@mui/material'
import { invoke } from '@tauri-apps/api'

const ImageBackground = lazy(() => import('./ui/ImageBackground'))
const VideoBackground = lazy(() => import('./ui/VideoBackground'))

export default function AuthLayout() {
  const { token, center_name, messages, alert, checkSession } = useBoundStore((state) => ({
    token: state.token,
    center_id: state.center_id,
    center_name: state.center_name,
    messages: state.messages,
    alert: state.alert,
    checkSession: state.checkSession,
    session: state.session
  }))

  const videoBackground = true
  const backgroundComponent = useMemo(() => {
    return videoBackground ? <VideoBackground /> : <ImageBackground />
  }, [videoBackground])

  const { showAlert } = useContext(notificationContext)

  useEffect(() => {
    if (messages && alert) {
      showAlert(messages, alert)
    }
  }, [messages, alert, showAlert])

  useEffect(() => {
    checkSession()
  }, [checkSession])

  return token ? (
    <Navigate to={'/home'} />
  ) : (
    <>
      {backgroundComponent}
      <Box height={'100vh'} width={'100vw'} display={'flex'} justifyContent={'center'}>
        <Box
          position={'relative'}
          width="450px"
          height={'100vh'}
          display={'flex'}
          alignItems={'center'}
          justifyContent="center"
          sx={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
          p={5}
          textAlign={'center'}
          minHeight={'100vh'}
        >
          <Box>
            <img src={logo} alt={center_name} lazy="load" width={'120px'} height={'120px'} />
            <Outlet />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              p: 2,
              textAlign: 'center',
              borderTop: 1
            }}
          >
            <span className="fs-3">
              <i className="bi bi-pc-display me-2"></i>PC01
            </span>
          </Box>
        </Box>
      </Box>

      <SystemInfo />
    </>
  )
}
