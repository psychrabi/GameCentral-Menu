import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import logo from '../public/logo512.png'
import { useBoundStore } from './stores/BoundStore'
// import ClientStats from '../components/ui/ClientStats'
import { VideoBackground } from '../components/ui/VideoBackground'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Notifications from './ui/Notifications'
import { SystemInfo } from './ui/SystemInfo'

export default function AuthLayout() {
  const token = useBoundStore((state) => state.token)
  const messages = useBoundStore((state) => state.messages)
  const setMessages = useBoundStore((state) => state.setMessages)
  const alert = useBoundStore((state) => state.alert)
  const setAlert = useBoundStore((state) => state.setAlert)
  const checkSession = useBoundStore((state) => state.checkSession)
  const checkSystemInfo = useBoundStore((state) => state.checkSystemInfo)
  const systeminfo = useBoundStore((state) => state.systeminfo)

  useEffect(() => {
    checkSession()
    checkSystemInfo()
  }, [])

  // if (!center_id) {
  //   return <Navigate to="/" />
  // }

  return (
    <>
      <VideoBackground />
      <div className="login">
        <main className="px-4">
          <div className="form-signin position-relative">
            <div autoComplete="off" className={'mb-3 px-5 mx-4 text-secondary'}>
              <div>
                <img src={logo} alt="" style={{ width: '8rem', height: '8rem' }} />
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
        {messages && (
          <Notifications
            messages={messages}
            setMessages={setMessages}
            alert={alert}
            setAlert={setAlert}
          />
        )}
      </div>
      {/* <ClientStats /> */}
      <SystemInfo stats={systeminfo} />
    </>
  )
}
