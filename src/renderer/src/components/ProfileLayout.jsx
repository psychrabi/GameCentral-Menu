import { NavLink, Outlet } from 'react-router-dom'
import '../assets/css/Profile.css'
import { Box, Card, Tab } from '@mui/material'
import { useState } from 'react'
import { TabContext, TabList } from '@mui/lab'

export default function ProfileLayout() {
  const [value, setValue] = useState(0)
  const handleChange = (_, newValue) => {
    setValue(newValue)
  }

  const navItems = [
    { name: 'Profile', path: '/profile/details' },
    { name: 'Sessions', path: '/profile/sessions' },
    { name: 'Security', path: '/profile/security' },
    { name: 'Notifications', path: '/profile/notifications' }
  ]

  return (
    <>
      <Card sx={{ m: 2, height: 'auto' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              {navItems.map(({ name, path, index }) => (
                <Tab key={path} label={name} value={index} component={NavLink} to={path} />
              ))}
            </TabList>
          </Box>
          <Box sx={{ p: 2 }}>
            <Outlet />
          </Box>
        </TabContext>
      </Card>
    </>
  )
}
