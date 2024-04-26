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

const Navigation = ({ handleLogout }) => {
  const navigate = useNavigate()
  const member = useBoundStore((state) => state.member)

  const memoizedTimer = useMemo(() => <Timer />, [])
  const [anchorEl, setAnchorEl] = useState()

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleNavigate = (path) => {
    setAnchorEl(null)
    navigate(path)
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
              {memoizedTimer}
            </Box>
            <Box className="non-draggable" display={'flex'} gap={0}>
              <Link to="/member/home">
                <IconButton aria-label="home">
                  <HomeIcon />
                </IconButton>
              </Link>
              <Link to="/member/games">
                <IconButton aria-label="games">
                  <SportsEsportsIcon />
                </IconButton>
              </Link>
              <Link to="/member/applications">
                <IconButton aria-label="applications">
                  <AppsIcon />
                </IconButton>
              </Link>
              <Link to="/member/shop">
                <IconButton aria-label="shop">
                  <StoreIcon />
                </IconButton>
              </Link>
              <Link to="/member/cart">
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
                <MenuItem onClick={() => handleNavigate('/member/profile/details')}>
                  Profile
                </MenuItem>
                <MenuItem onClick={() => handleNavigate('/member/profile/sessions')}>
                  Sessions
                </MenuItem>
                <MenuItem onClick={() => handleNavigate('/member/profile/security')}>
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
