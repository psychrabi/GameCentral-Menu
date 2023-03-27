import { useEffect, useRef } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Notifications from '../components/Notifications'
import logo from '../public/logo512.png'
// import background from '../public/login.png'
import { useAuthStore } from './stores/AuthStore'
import ClientStats from '../components/ui/ClientStats'
import { VideoBackground } from '../components/ui/VideoBackground'
import 'bootstrap-icons/font/bootstrap-icons.css'

// import { ImageBackground } from '../../components/ui/ImageBackground'
export default function AuthLayout() {
  const { token, checkSession, error } = useAuthStore()

  useEffect(() => {
    checkSession()
  }, [])

  // if (!center_id) {
  //   return <Navigate to="/" />
  // }

  if (!token) {
    return (
      <>
        <VideoBackground />
        {/* <div style={{ background: `url(${background})`, backgroundSize: 'cover' }}> */}
        <div className="login">
          <main className="px-4">
            <div className="form-signin position-relative">
              <div autoComplete="off" className={'mb-3 px-5 mx-4 text-secondary'}>
                <div>
                  <img src={logo} alt="" style={{ width: '4rem', height: '4rem' }} />
                </div>
                <Outlet />
              </div>
              <div className="py-2 bg-dark text-light position-absolute bottom-0 start-0 end-0">
                <span className="fs-3 ">PC01</span>
              </div>
            </div>
          </main>
          {error ? <Notifications notifications={error} /> : ''}
          <ClientStats />
        </div>
      </>
    )
  } else {
    return <Navigate to="/" />
  }
}
