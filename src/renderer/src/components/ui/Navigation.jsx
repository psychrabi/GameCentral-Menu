import { NavLink } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'

const Navigation = () => {
  return (
    <ul className="nav non-draggable col-6 col-lg-auto my-2 justify-content-lg-center my-md-0 text-small">
      <li>
        <NavLink to="/" className={`nav-link text-white`}>
          <i
            className="bi bi-house d-block mx-auto mb-1 text-center"
            style={{ fontSize: '1.5rem' }}
          />
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/games" className={`nav-link text-white`}>
          <i
            className="bi bi-controller d-block mx-auto mb-1 text-center"
            style={{ fontSize: '1.5rem' }}
          />
          Games
        </NavLink>
      </li>
      <li>
        <NavLink to="/applications" className="nav-link text-white">
          <i
            className="bi bi-tools d-block mx-auto mb-1 text-center"
            style={{ fontSize: '1.5rem' }}
          />
          Apps
        </NavLink>
      </li>
      <li>
        <NavLink to="/shop" className="nav-link text-white">
          <i
            className="bi bi-cart3 d-block mx-auto mb-1 text-center"
            style={{ fontSize: '1.5rem' }}
          />
          Shop
        </NavLink>
      </li>
    </ul>
  )
}

export default Navigation
