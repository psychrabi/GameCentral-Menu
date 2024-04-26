import React, { useEffect } from 'react'
import { useBoundStore } from '../../stores/BoundStore'
import { Box, List, ListItem, Paper, Typography } from '@mui/material'

const SystemInfo = () => {
  const { systeminfo, checkSystemInfo } = useBoundStore((state) => ({
    systeminfo: state.systeminfo,
    checkSystemInfo: state.checkSystemInfo
  }))

  useEffect(() => {
    checkSystemInfo()
  }, [])
  return (
    systeminfo && (
      <Box position="absolute" bottom={0} right={0} width={'400px'}>
        <List className="text-start row">
          {Object.entries(systeminfo).map(([key, value]) => (
            <ListItem key={key}>
              <Typography variant="h6" marginRight={2}>
                {key}
              </Typography>
              <Typography variant="body1" noWrap>
                {value}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Box>
    )
  )
}


export default SystemInfo
