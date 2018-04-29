var React = require('react')
var PropTypes = require('prop-types')
var Link = require('react-router-dom').Link

function PlayerPreview (props) {
  return (
    <div>
      <div className='text-center'>
        <img className='img-fluid img-thumbnail rounded'
          src={props.avatar}
          alt={'Avatar for ' + props.username}
        />
        <h5>@{props.username}</h5>
      </div>
      <button
        className='btn btn-sm'
        onClick={props.onReset.bind(null, props.id)}>
          Reset
      </button>
    </div>
  )
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
}

class PlayerInput extends React.Component {
  constructor(props){
    super(props)
    
    this.state = {
      username: ''
    }
    
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    var value = event.target.value
    
    this.setState(function() {
      return {
        username: value
      }
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    
    this.props.onSubmit(
      this.props.id,
      this.state.username
    )
  }
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
      <div className='form-group'>
        <label htmlFor='username'>
          {this.props.label}
        </label>
        <input className='form-control form-control-lg'
          id='username'
          placeholder='github username'
          type='text'
          autoComplete='off'
          value={this.state.username}
          onChange={this.handleChange} />
      </div>
      <br/>
      <button className='btn btn-md btn-primary btn-block' type='submit' disabled={!this.state.username}>Submit</button>
      </form>
    )
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
}

class Battle extends React.Component {
  constructor (props) {
    super(props)
    
    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null
    }
    
    this.handleReset = this.handleReset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(id, username) {
    this.setState(function(){
      var newState = {}
      newState[id + 'Name'] = username;
      newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200'
      return newState
    })
  }
  handleReset(id) {
    this.setState(function () {
      var newState = {};
      newState[id + 'Name'] = '';
      newState[id + 'Image'] = null;
      return newState;
    })
  }
  render () {
    var match = this.props.match
    var playerOneName = this.state.playerOneName
    var playerTwoName = this.state.playerTwoName
    var playerOneImage = this.state.playerOneImage
    var playerTwoImage = this.state.playerTwoImage
    
    return (
      <div>
        <h5>GitHub Battle</h5>
        <br/><br/>
        <div className="row">
          <div className="col-md-6">
          <div className="card">
          <div className="card-body">
          {!playerOneName &&
              <PlayerInput 
                id='playerOne'
                label='Player One'
                onSubmit={this.handleSubmit}
              />
          }
          
          {playerOneImage !== null &&
            <PlayerPreview
              avatar={playerOneImage}
              username={playerOneName}
              onReset={this.handleReset}
              id='playerOne'
            />}
          </div>
          </div>
          </div>
          <div className="col-md-6">
          <div className="card">
          <div className="card-body">        
          {!playerTwoName &&
              <PlayerInput 
                id='playerTwo'
                label='Player Two'
                onSubmit={this.handleSubmit}
              />
          }
          
          {playerTwoImage !== null &&
            <PlayerPreview
              avatar={playerTwoImage}
              username={playerTwoName}
              onReset={this.handleReset}
              id='playerTwo'
            />}
          </div>
          </div>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-md">
            {playerOneImage && playerTwoImage &&
              <Link className='btn btn-lg btn-primary' to={{
                  pathname: match.url + '/results',
                    search: '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName
                }}>Battle</Link>
            }
          </div>
        </div>
      </div>
    )
  }
}

module.exports = Battle