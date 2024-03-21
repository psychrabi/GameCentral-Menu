import { NavLink } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useBoundStore } from '../stores/BoundStore'
import navListData from '../../data/navListData'
import NavListItem from './NavListItem'
import { submitData } from '../../utils/fetchData'
import { useNavigate } from 'react-router-dom'
import user from '../../public/user.png'
import Timer from './Timer'
import { useMemo } from 'react'

const Navigation = () => {
  const navigate = useNavigate();
  const { member, token, setMessages, setAlert, sessionType, session, reset, start_time } = useBoundStore(state => ({
    member: state.member,
    token: state.token,
    setMessages: state.setMessages,
    setAlert: state.setAlert,
    sessionType: state.sessionType,
    session: state.session,
    reset: state.reset,
    start_time: state.start_time
  }));
  const COST_PER_HOUR = 60;
  const memoizedTimer = useMemo(() => <Timer />, []);

  const handleLogout = async () => {
    const total_time = (Date.now() - start_time) / 1000; //in seconds
    const usage_details = {
      session_id: session.id,
      total_time: total_time,
      sessionType: sessionType,
      session_cost: ((total_time / (60 * 60)) * COST_PER_HOUR).toFixed(2)
    };

    const logout = await submitData('/members/logout', token, usage_details);
    if (logout) {
      ['token', 'member', 'session', 'start_time', 'sessionType', 'sessions', 'settings'].forEach(key => localStorage.removeItem(key));

      reset();

      setMessages('You have successfully logged out');
      setAlert('success');
      navigate('/login');
    }
  }
  return (
    <>
      <header className="draggable">
        <div className="px-3 py-2 text-bg-dark">
          <div className="container-fluid px-0">
            <div className="d-flex flex-wrap align-items-center justify-content-between justify-content-lg-start">
              <NavLink
                to="/"
                className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none"
              >
                <i className="bi bi-bootstrap me-3" style={{ fontSize: '2rem' }}></i>
                GameCentral Menu
              </NavLink>
              {memoizedTimer}
              <ul className="nav non-draggable col-6 col-lg-auto my-2 justify-content-lg-center my-md-0 text-small">
                {navListData.map((nav) => (
                  <NavListItem nav={nav} key={nav._id} />
                ))}
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
                      src={user}
                      alt="mdo"
                      width="36"
                      height="36"
                      className={`rounded-circle ms-3 me-2 border border-3 ${sessionType === 'balance' ? 'border-success' : 'border-danger'
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
                    <span className="dropdown-item" onClick={() => handleLogout()}>
                      Sign out
                    </span>
                  </li>
                </ul>
              </div>{' '}
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Navigation
