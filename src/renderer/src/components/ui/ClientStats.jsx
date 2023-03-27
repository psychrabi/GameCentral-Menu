import { useCallback, useEffect, useState } from 'react'
import { Spinner } from './Spinner'
import { SystemInfo } from './SystemInfo'

const ClientStats = () => {
  const [clientStats, setClientStats] = useState(localStorage.getItem('systemInfo'))
  const [loading, setLoading] = useState(false)
  const setSystemInfo = (info) => {
    setClientStats({
      hostname: info.osInfo.hostname,
      cpu: info.cpu.manufacturer + ' ' + info.cpu.brand,
      graphics: info.graphics.controllers.filter((controller) => controller.vram > 0)[0].model,
      ram: (info.mem.total / (1024 * 1024 * 1024)).toFixed(2) + 'GB',
      os: info.osInfo.distro + ' build ' + info.osInfo.build,
      ip4: info.networkInterfaces[0].ip4
    })
  }
  const getClientInfo = useCallback(async () => {
    setLoading(true)
    try {
      let SystemInfo = await window.api.getSystemInfo()
      setSystemInfo(SystemInfo)
      localStorage.setItem('systemInfo', JSON.stringify(SystemInfo))
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!localStorage.getItem('systemInfo')) {
      getClientInfo()
    } else {
      setSystemInfo(JSON.parse(localStorage.getItem('systemInfo')))
    }
  }, [])
  return (
    <footer className="position-absolute bottom-0 mb-4 me-4 end-0 text-light client-stats">
      {loading ? <Spinner /> : <SystemInfo stats={clientStats} />}
    </footer>
  )
}

export default ClientStats
