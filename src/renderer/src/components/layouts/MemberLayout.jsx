import { Box } from '@mui/material'
import React, { lazy, useContext, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import notificationContext from '../../context/NotificationContext'
import Header from '../shared/Header/Header'
import { useBoundStore } from '../stores/BoundStore'

const Navigation = lazy(() => import('../shared/Navigation/Navigation'))
const Details = lazy(() => import('../ui/Game/Details/Details'))

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
      <Box
        height={'100vh'}
        display={'flex'}
        flexDirection={'column'}
        onContextMenu={(e) => {
          e.preventDefault() // prevent the default behaviour when right clicked
        }}
      >
        <Navigation />
        <Header categories={gameTypes} page_title={'All Products'} />
        <Box flex={1} overflow={'auto'} className="no-scrollbar" paddingBottom={2}>
          <Outlet />
        </Box>
      </Box>
      {show && <Details />}
    </>
  )
}

export default MemberLayout
