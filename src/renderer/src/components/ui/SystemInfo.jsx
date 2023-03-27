/* eslint-disable react/prop-types */
export const SystemInfo = ({ stats }) => {
  return (
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
  )
}
