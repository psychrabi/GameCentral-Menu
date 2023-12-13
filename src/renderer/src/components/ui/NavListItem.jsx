import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

const NavListItem = ({ nav }) => {
  return (
    <li>
      <NavLink to={nav.link} className={`nav-link text-white`}>
        <i
          className={`d-block mx-auto mb-1 text-center ${nav.icon}`}
          style={{ fontSize: '1.5rem' }}
        />
        {nav.name}
      </NavLink>
    </li>
  )
}

NavListItem.propTypes = {
  nav: PropTypes.object
}
export default NavListItem
