import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import AdbIcon from '@mui/icons-material/Adb'
import AppsIcon from '@mui/icons-material/Apps'
import HomeIcon from '@mui/icons-material/Home'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import StoreIcon from '@mui/icons-material/Store'
import { Avatar } from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import user from '../../../public/user.png'
import { submitData } from '../../../utils/fetchData'
import { useBoundStore } from '../../stores/BoundStore'
import Timer from '../../ui/Timer'

const Navigation = () => {
  const navigate = useNavigate()
  const { member, token, setMessages, setAlert, sessionType, session, reset, start_time } =
    useBoundStore((state) => ({
      member: state.member,
      token: state.token,
      setMessages: state.setMessages,
      setAlert: state.setAlert,
      sessionType: state.sessionType,
      session: state.session,
      reset: state.reset,
      start_time: state.start_time
    }))
  const COST_PER_HOUR = 60
  const memoizedTimer = useMemo(() => <Timer />, [])
  const [anchorEl, setAnchorEl] = useState()

  const handleLogout = async () => {
    const total_time = (Date.now() - start_time) / 1000 //in seconds
    const usage_details = {
      session_id: session.id,
      total_time: total_time,
      sessionType: sessionType,
      session_cost: ((total_time / (60 * 60)) * COST_PER_HOUR).toFixed(2)
    }
    try {
      const logout = await submitData('/members/logout', token, usage_details)
      if (logout) {
        ;[
          'token',
          'member',
          'session',
          'start_time',
          'sessionType',
          'sessions',
          'settings'
        ].forEach((key) => localStorage.removeItem(key))

        setMessages('You have successfully logged out')
        setAlert('success')
      }
      reset()

      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (event) => {
    setAuth(event.target.checked)
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleNavigate = (path) => {
    navigate(path)
    handleClose()
  }
  return (
    <>
      <Box data-tauri-drag-region>
        <AppBar position="static" data-tauri-drag-region>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }} data-tauri-drag-region>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              GameCentral Menu
            </Typography>
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', mt: 0.5 }}>
              <Timer />
            </Box>
            <Box className="non-draggable" display={'flex'} gap={0}>
              <Link to="/home">
                <IconButton aria-label="home" >
                  <HomeIcon />
                </IconButton>
              </Link>
              <Link to="/games">
                <IconButton aria-label="games">
                  <SportsEsportsIcon />
                </IconButton>
              </Link>
              <Link to="/applications">
                <IconButton aria-label="applications">
                  <AppsIcon />
                </IconButton>
              </Link>
              <Link to="/shop">
                <IconButton aria-label="shop">
                  <StoreIcon />
                </IconButton>
              </Link>
              <Link to="/cart">
                <IconButton aria-label="cart">
                  <ShoppingCartIcon />
                </IconButton>
              </Link>
            </Box>
            <Box sx={{ flexGrow: 0, cursor: 'pointer' }} className="non-draggable">
              <Tooltip title="Open settings" onClick={handleMenu}>
                <Typography variant="body2" component="div" sx={{ flexGrow: 1 }}>
                  <IconButton>
                    <Avatar alt={member?.name} src={user} />
                  </IconButton>
                  {member.first_name + ' ' + member.last_name}
                </Typography>
              </Tooltip>

              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => handleNavigate('/profile/details')}>Profile</MenuItem>
                <MenuItem onClick={() => handleNavigate('/profile/sessions')}>Sessions</MenuItem>
                <MenuItem onClick={() => handleNavigate('/profile/security')}>
                  Change Password
                </MenuItem>
                <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}

export default Navigation
