var React = require('react')
var NavLink = require('react-router-dom').NavLink

function Nav () {
  return (
  <ul className='nav nav-tabs justify-content-center'>
    <li className='nav-item'>
      <NavLink className='nav-link' activeClassName='active' to='/' exact>
        Home
      </NavLink>
    </li>
    <li className='nav-item'>
      <NavLink className='nav-link' activeClassName='active' to='/battle'>
        Battle
      </NavLink>
    </li>
    <li className='nav-item'>
      <NavLink className='nav-link' activeClassName='active' to='/popular'>
        Popular
      </NavLink>
    </li>
  </ul>
  )
}

module.exports = Nav