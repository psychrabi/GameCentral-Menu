import { Navigate, Outlet } from 'react-router-dom'
import logo from '../public/logo.png'
import { useBoundStore } from './stores/BoundStore'
import 'bootstrap-icons/font/bootstrap-icons.css'
// import { SystemInfo } from './ui/SystemInfo'
import { lazy, useContext, useEffect } from 'react'
import notificationContext from '../context/NotificationContext'

const ImageBackground = lazy(() => import('./ui/ImageBackground'))
const VideoBackground = lazy(() => import('./ui/VideoBackground'))

export default function AuthLayout() {
  const { token, center_id, center_name, messages, alert, checkSession, systeminfo } = useBoundStore(state => ({
    token: state.token,
    center_id: state.center_id,
    center_name: state.center_name,
    messages: state.messages,
    alert: state.alert,
    checkSession: state.checkSession,
    systeminfo: state.systeminfo,
  }));
  const { showAlert } = useContext(notificationContext);
  const videoBackground = true;

  useEffect(() => {
    if (messages && alert) {
      showAlert(messages, alert);
    }
  }, [messages, alert, showAlert]);

  useEffect(() => {
    checkSession();
    // checkSystemInfo();
  }, [checkSession]);

  return (
    <>
      {videoBackground ? <VideoBackground /> : <ImageBackground />}
      <div className="login">
        <main className="px-4">
          <div className="form-signin position-relative">
            <div autoComplete="off" className="mb-3 px-5 mx-4 text-secondary">
              <img src={logo} alt={center_name} />
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
      {/* {systeminfo && <SystemInfo stats={systeminfo} />} */}
    </>
  );
}
