import React, { lazy, useContext, useEffect, useMemo } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import notificationContext from '../context/NotificationContext'
import { useBoundStore } from './stores/BoundStore'

const Timer = lazy(() => import('./ui/Timer'))
const Navigation = lazy(() => import('./ui/Navigation'))
const Details = lazy(() => import('./ui/Details'))

function MemberLayout() {
  const { token, loading, center_id, show, messages, alert } = useBoundStore(state => ({
    token: state.token,
    loading: state.loading,
    center_id: state.center_id,
    show: state.show,
    messages: state.messages,
    alert: state.alert
  }));
  const { showAlert } = useContext(notificationContext);

    if (!center_id) {
    return <Navigate to="/admin" />;
  }

  useEffect(() => {
    if (messages && alert) {
      showAlert(messages, alert);
    }
  }, [messages, alert, showAlert]);

  const MemoizedDetails = useMemo(() => React.memo(Details), []);
  const MemoizedNavigation = useMemo(() => React.memo(Navigation), []);

  return (
    <>
      <MemoizedNavigation />
      <div className="game-app">
        <main className="no-scrollbar">
          <Outlet />
        </main>
        {show && <MemoizedDetails />}
      </div>
    </>
  );
}

export default MemberLayout
