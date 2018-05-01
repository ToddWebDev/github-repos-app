var React = require('react')
var PropTypes = require('prop-types')

function PlayerPreview (props) {
  return (
    <div>
      <div className='text-center'>
        <img className='img-fluid rounded'
          src={props.avatar}
          alt={'Avatar for ' + props.username}
        />
        <h5>@{props.username}</h5>
      </div>
      {props.children}
    </div>
  )
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
}

module.exports = PlayerPreview