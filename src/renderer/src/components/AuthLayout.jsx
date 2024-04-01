import 'bootstrap-icons/font/bootstrap-icons.css'
import { Navigate, Outlet } from 'react-router-dom'
import logo from '../public/logo.png'
import { useBoundStore } from './stores/BoundStore'
import SystemInfo from './ui/SystemInfo'
import { Suspense, lazy, useContext, useEffect, useMemo } from 'react'
import notificationContext from '../context/NotificationContext'
import Loading from './ui/Loading'
// import io from 'socket.io-client'

const ImageBackground = lazy(() => import('./ui/ImageBackground'))
const VideoBackground = lazy(() => import('./ui/VideoBackground'))

export default function AuthLayout() {
  const { token, center_name, messages, alert, checkSession, checkSystemInfo, systeminfo } = useBoundStore(
    (state) => ({
      token: state.token,
      center_id: state.center_id,
      center_name: state.center_name,
      messages: state.messages,
      alert: state.alert,
      checkSession: state.checkSession,
      session: state.session,
      checkSystemInfo: state.checkSystemInfo
      // systeminfo: state.systeminfo
    })
  )

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
    checkSystemInfo()
  }, [checkSession])

  // useEffect(() => {
  //   const socket = io('http://localhost:3000');

  //      // Send system information to the server
  //   socket.emit('systemInfo', systeminfo);

  //   // Clean up the WebSocket connection when the component unmounts
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  return token ? (
    <Navigate to={'/'} />
  ) : (
    <>
      {backgroundComponent}
      <div className="login">
        <main className="px-4">
          <div className="form-signin position-relative">
            <div autoComplete="off" className="mb-3 px-5 mx-4 text-secondary">
              <img src={logo} alt={center_name} />
              <Outlet />
            </div>
            <div className="py-2 bg-dark text-light position-absolute bottom-0 start-0 end-0">
              <span className="fs-3">
                <i className="bi bi-pc-display me-2"></i>PC01
              </span>
            </div>
          </div>
        </main>
      </div>
      <Suspense fallback={<Loading />}>
        <SystemInfo />
      </Suspense>
    </>
  )
}
