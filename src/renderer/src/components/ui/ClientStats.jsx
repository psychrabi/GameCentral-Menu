import { useCallback, useEffect, useState } from 'react'

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
    <footer className="position-absolute bottom-0 mb-5 me-5 end-0 text-light">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <div
            className="spinner-border text-primary spinner-border-sm"
            role="status"
            style={{ width: '3rem', height: '3rem' }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <ul className="list-unstyled text-start text-small">
          <li>
            {' '}
            CPU : <span className="cpu">{clientStats?.cpu}</span>
          </li>
          <li>
            {' '}
            Graphics : <span className="graphics">{clientStats?.graphics}</span>{' '}
          </li>
          <li>
            {' '}
            RAM : <span className="ram">{clientStats?.ram}</span>{' '}
          </li>
          <li>
            {' '}
            OS : <span className="os">{clientStats?.os}</span>{' '}
          </li>
          <li>
            IP : <span className="ip4">{clientStats?.ip4}</span>
          </li>
        </ul>
      )}
    </footer>
  )
}

export default ClientStats
