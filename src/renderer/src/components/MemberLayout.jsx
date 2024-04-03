import React, { lazy, useContext, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import notificationContext from '../context/NotificationContext'
import { useBoundStore } from './stores/BoundStore'
import Header from './shared/Header/Header'
import { Box } from '@mui/material'

const Timer = lazy(() => import('./ui/Timer'))
const Navigation = lazy(() => import('./ui/Navigation'))
const Details = lazy(() => import('./ui/Details'))

function MemberLayout() {
  const { center_id, show, messages, alert, gameTypes } = useBoundStore((state) => ({
    token: state.token,
    loading: state.loading,
    center_id: state.center_id,
    show: state.show,
    messages: state.messages,
    alert: state.alert,
    gameTypes: state.gameTypes
  }))
  const { showAlert } = useContext(notificationContext)

  if (!center_id) {
    return <Navigate to="/admin" />
  }

  useEffect(() => {
    if (messages && alert) {
      showAlert(messages, alert)
    }
  }, [messages, alert, showAlert])

  return (
    <>
      <Box height={'100vh'} display={'flex'} flexDirection={'column'}>
        <Navigation />
        <Header categories={gameTypes} page_title={'All Products'} />
        <Box flex={1} overflow={'auto'} className="no-scrollbar">
          <Outlet />
        </Box>
      </Box>
      {show && <Details />}
    </>
  )
}

export default MemberLayout
