import { NavLink } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useAuthStore } from '../stores/AuthStore'

const Navigation = () => {
  const member = useAuthStore((state) => state.member)
  const logout = useAuthStore((state) => state.logout)
  const sessionType = useAuthStore((state) => state.sessionType)
  const COST_PER_HOUR = 60
  return (
    <>
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
      <div className="dropdown border-start non-draggable">
        <NavLink
          to="/profile"
          className="link-light text-decoration-none"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <div
            className={
              'd-flex align-items-center justify-content-between justify-content-lg-start dropdown-toggle'
            }
          >
            <img
              src={'https://github.com/mdo.png'}
              alt="mdo"
              width="36"
              height="36"
              className={`rounded-circle ms-3 me-2 border border-3 ${
                sessionType === 'balance' ? 'border-success' : 'border-danger'
              }`}
              loading="lazy"
            />
            <span>
              {member.first_name} {member.last_name}
              <br />
              <small>
                {sessionType === 'credit'
                  ? 'On credit'
                  : `${member.balance} (+${member.bonus_balance})`}
              </small>
            </span>
          </div>
        </NavLink>

        <ul className="dropdown-menu" style={{ zIndex: 2000 }}>
          <li>
            <NavLink className="dropdown-item" to="/profile/profile">
              Profile
            </NavLink>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <NavLink className="dropdown-item" to=" " onClick={() => logout(COST_PER_HOUR)}>
              Sign out
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Navigation
