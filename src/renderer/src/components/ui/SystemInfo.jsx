import { Spinner } from 'react-bootstrap'

/* eslint-disable react/prop-types */
export const SystemInfo = ({ stats }) => {
  return (
    <footer className="position-absolute bottom-0 mb-4 me-4 end-0 text-light client-stats">
      {!stats ? (
        <Spinner />
      ) : (
        <dl className="text-start row">
          <dt className="col-sm-3 text-end">CPU</dt>
          <dd className="col-sm-9">{stats?.cpu}</dd>
          <dt className="col-sm-3 text-end">Graphics</dt>
          <dd className="col-sm-9">{stats?.graphics}</dd>
          <dt className="col-sm-3 text-end">RAM</dt>
          <dd className="col-sm-9">{stats?.ram}</dd>
          <dt className="col-sm-3 text-end">OS</dt>
          <dd className="col-sm-9">{stats?.os}</dd>
          <dt className="col-sm-3 text-end">IP</dt>
          <dd className="col-sm-9">{stats?.ip4}</dd>
        </dl>
      )}
    </footer>
  )
}
