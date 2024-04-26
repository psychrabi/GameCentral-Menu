import { Box } from '@mui/material'
import React, { lazy, useCallback, useContext, useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import notificationContext from '../../context/NotificationContext'
import Header from '../shared/Header/Header'
import Navigation from '../shared/Navigation/Navigation'
import { useBoundStore } from '../stores/BoundStore'
import { submitData } from '../../utils/fetchData'

const Details = lazy(() => import('../ui/Game/Details/Details'))

function MemberLayout() {
  const {
    token,
    center_id,
    show,
    messages,
    alert,
    gameTypes,
    start_time,
    session,
    sessionType,
    reset,
    setMessages,
    setAlert
  } = useBoundStore((state) => ({
    token: state.token,
    loading: state.loading,
    center_id: state.center_id,
    show: state.show,
    messages: state.messages,
    alert: state.alert,
    gameTypes: state.gameTypes,
    favoriteGames: state.favoriteGames,
    start_time: state.start_time,
    session: state.session,
    sessionType: state.sessionType,
    reset: state.reset,
    setMessages: state.setMessages,
    setAlert: state.setAlert
  }))
  const COST_PER_HOUR = 60
  const { showAlert } = useContext(notificationContext)
  const navigate = useNavigate()

  const handleLogout = async () => {
    const total_time = (Date.now() - start_time) / 1000 //in seconds
    const payload = {
      session_id: session.id,
      total_time: total_time,
      sessionType: sessionType,
      session_cost: ((total_time / (60 * 60)) * COST_PER_HOUR).toFixed(2)
    }

    try {
      const logout = await submitData('/members/logout', token, payload)
      if (logout) {
        reset()
      }
    } catch (error) {
      console.log(error)
    } finally {
      navigate('/', { replace: true })
      setMessages('You have successfully logged out')
      setAlert('success')
    }
  }

  if (!center_id && !center_name) {
    return <Navigate to="/auth/admin" />
  }
  if (!token) {
    return <Navigate to="/" />
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
        <Navigation handleLogout={handleLogout} />
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
