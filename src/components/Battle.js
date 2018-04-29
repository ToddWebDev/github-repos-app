var React = require('react')
var PropTypes = require('prop-types')

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
      <button className='btn btn-md btn-primary btn-block' type='submit' disabled={!this.state.username}>Submit</button>
      </form>
    )
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
//  onSubmit PropTypes.func.isRequired
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
  render () {
    var playerOneName = this.state.playerOneName
    var playerTwoName = this.state.playerTwoName
    
    return (
      <div>
        <div className="jumbotron text-center">
          <h1 className="display-4">GitHub Battle</h1>
        </div>
        <div className="row">
          {!playerOneName &&
            <div className="col-md-6">
              <PlayerInput 
                id='playerOne'
                label='Player One'
                onSubmit={this.handleSubmit}
              />
            </div>
          }
          {!playerTwoName &&
            <div className="col-md-6">
              <PlayerInput 
                id='playerTwo'
                label='Player Two'
                onSubmit={this.handleSubmit}
              />
            </div>
          }
          
        </div>
      </div>
    )
  }
}

module.exports = Battle