/* eslint-disable react/prop-types */
export const SystemInfo = ({ stats }) => {
  return (
    <ul className="list-unstyled text-start text-small">
      <li>
        CPU : <span className="cpu">{stats?.cpu}</span>
      </li>
      <li>
        Graphics : <span className="graphics">{stats?.graphics}</span>
      </li>
      <li>
        RAM : <span className="ram">{stats?.ram}</span>
      </li>
      <li>
        OS : <span className="os">{stats?.os}</span>
      </li>
      <li>
        IP : <span className="ip4">{stats?.ip4}</span>
      </li>
    </ul>
  )
}
