import { Box } from '@mui/material'
import { lazy, use, useEffect, useMemo } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import notificationContext from '../../context/NotificationContext'
import { useBoundStore } from '../stores/BoundStore'
import logo from '../../public/logo.png'

const SystemInfo = lazy(() => import('../ui/Auth/SystemInfo'))
const ImageBackground = lazy(() => import('../ui/Auth/ImageBackground'))
const VideoBackground = lazy(() => import('../ui/Auth/VideoBackground'))

export default function AuthLayout() {
  const { token, center_id, center_name, messages, alert, checkSession, fetchData } = useBoundStore(
    (state) => ({
      token: state.token,
      center_id: state.center_id,
      center_name: state.center_name,
      messages: state.messages,
      alert: state.alert,
      checkSession: state.checkSession,
      session: state.session,
      fetchData: state.fetchData
    })
  )

  const videoBackground = true
  const backgroundComponent = useMemo(() => {
    return videoBackground ? <VideoBackground /> : <ImageBackground />
  }, [videoBackground])

  const { showAlert } = use(notificationContext)

  useEffect(() => {
    checkSession()
    if (center_id) {
      fetchData(center_id)
    }
    if (messages && alert) {
      showAlert(messages, alert)
    }
  }, [center_id, messages, alert, showAlert])

  return token ? (
    <Navigate to={'/member/home'} />
  ) : (
    <>
      {backgroundComponent}
      <Box
        height={'100vh'}
        width={'100vw'}
        display={'flex'}
        justifyContent={'center'}
        onContextMenu={(e) => {
          e.preventDefault() // prevent the default behaviour when right clicked
        }}
      >
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
            <img
              src={logo}
              lazy="load"
              width={'120px'}
              height={'120px'}
              alt={`${center_name}-logo`}
            />
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
