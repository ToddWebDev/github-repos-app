var React = require('react')
var NavLink = require('react-router-dom').NavLink

function Nav () {
  return (
  <div className='navbar navbar-expand-sm navbar-light bg-light'>
    <a className="navbar-brand" href="#">GitHub Battlefield</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className='navbar-nav mr-auto'>
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
    </div>
  </div>
  )
}

module.exports = Nav