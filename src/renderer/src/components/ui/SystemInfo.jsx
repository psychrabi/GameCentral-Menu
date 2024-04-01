import React from 'react'
import PropTypes from 'prop-types'
import { useBoundStore } from '../stores/BoundStore'

const SystemInfo = () => {
  const systeminfo = useBoundStore((state) => state.systeminfo)
  return systeminfo ? (
    <footer className=" client-stats">
      <dl className="text-start row">
        {Object.entries(systeminfo).map(([key, value]) => (
          <React.Fragment key={key}>
            <dt className="col-sm-3 text-end">{key.toUpperCase()}</dt>
            <dd className="col-sm-9 text-truncate">{value}</dd>
          </React.Fragment>
        ))}
      </dl>
    </footer>
  ) : (
    <footer className="text-center client-stats">
      <div className="spinner-border" role="status" style={{ width: '6rem', height: '6rem' }}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </footer>
  )
}

SystemInfo.propTypes = {
  stats: PropTypes.object
}

export default SystemInfo
