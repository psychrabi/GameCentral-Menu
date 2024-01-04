import { Navigate, Outlet } from 'react-router-dom'
import logo from '../public/logo.png'
import { useBoundStore } from './stores/BoundStore'
import 'bootstrap-icons/font/bootstrap-icons.css'
// import { SystemInfo } from './ui/SystemInfo'
import { lazy, useContext, useEffect } from 'react'
import notificationContext from '../context/notificationContext'

const ImageBackground = lazy(() => import('./ui/ImageBackground'))
const VideoBackground = lazy(() => import('./ui/VideoBackground'))

export default function AuthLayout() {
  const token = useBoundStore((state) => state.token)
  const center_id = useBoundStore((state) => state.center_id)
  const center_name = useBoundStore((state) => state.center_name)
  const messages = useBoundStore((state) => state.messages)
  const alert = useBoundStore((state) => state.alert)
  const checkSession = useBoundStore((state) => state.checkSession)
  // const checkSystemInfo = useBoundStore((state) => state.checkSystemInfo)
  // const systeminfo = useBoundStore((state) => state.systeminfo)
  const { showAlert } = useContext(notificationContext)
  const videoBackground = false

  useEffect(() => {
    if (messages && alert) {
      console.log(messages)
      showAlert(messages, alert)
    }
  }, [messages, alert])

  useEffect(() => {
    checkSession()
    // checkSystemInfo()
  }, [])

  // if (!center_id) {
  //   return <Navigate to="/admin" />
  // }

  return (
    <>
      {videoBackground && <VideoBackground />}
      {!videoBackground && <ImageBackground />}
      <div className="login">
        <main className="px-4">
          <div className="form-signin position-relative">
            <div autoComplete="off" className={'mb-3 px-5 mx-4 text-secondary'}>
              <div>
                <img src={logo} alt={center_name}/>
              </div>
              {!token ? <Outlet /> : <Navigate to="/" />}
            </div>
            <div className="py-2 bg-dark text-light position-absolute bottom-0 start-0 end-0">
              <span className="fs-3">
                <i className="bi bi-pc-display me-2"></i>PC01
              </span>
            </div>
          </div>
        </main>
      </div>
      {/* <SystemInfo stats={systeminfo} /> */}
    </>
  )
}
