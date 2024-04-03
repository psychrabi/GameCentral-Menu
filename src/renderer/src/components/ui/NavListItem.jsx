import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'

const NavListItem = React.memo(({ nav }) => {
  const { link, icon, name } = nav
  return (
    <li>
      <NavLink to={link} className="nav-link text-white">
        <i className={`d-block mx-auto mb-1 text-center ${icon}`} style={{ fontSize: '1.5rem' }} />
        {name}
      </NavLink>
    </li>
  )
})

NavListItem.propTypes = {
  nav: PropTypes.object
}
export default NavListItem
