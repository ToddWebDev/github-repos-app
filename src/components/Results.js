var React = require('react')
var PropTypes = require('prop-types')
var queryString = require('query-string')
var api = require('../utils/api')
var Link = require('react-router-dom').Link
var PlayerPreview = require('./PlayerPreview')
var Loading = require('./Loading')

function Profile (props) {
  var info = props.info
  
  return (
    <PlayerPreview
     avatar={info.avatar_url} username={info.login}>
      <ul className='space-list-items'>
        {info.name && <li>{info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company && <li>{info.company}</li>}
        <li>Followers: {info.followers}</li>
        <li>Following: {info.following}</li>
        <li>Public Repos: {info.public_repos}</li>
        {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
      </ul>
    </PlayerPreview>
  )
}

Profile.propTypes = {
  info: PropTypes.object.isRequired
}

function Player (props) {
  return (
    <div>
      <h1 className="display-3">{props.label}</h1>
      <h3>Score: {props.score}</h3>
      <Profile info={props.profile} />
    </div>
  )
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
}

class Results extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }
  componentDidMount () {
    var players = queryString.parse(this.props.location.search)
    
    api.battle([
      players.playerOneName,
      players.playerTwoName
    ]).then(function(players){
      if (players === null) {
        return this.setState(function() {
          return {
            error: 'Error.',
            loading: false
          }
        })
      }
      
      this.setState(function(){
        return {
          error: null,
          winner: players[0],
          loser: players[1],
          loading: false
        }
      })
      
    }.bind(this))
  }
  render () {
    var error = this.state.error
    var winner = this.state.winner
    var loser = this.state.loser
    var loading = this.state.loading
    
    if (loading === true) {
      return <Loading text="And the winner is" />
    }
    
    if(error) {
      return (
        <div>
          <p>{error}</p>
          <Link to='/battle'>Reset</Link>
        </div>
      )
    }
    
    return (
      <div className='row'>
      <div className='col-md'>
      <div className='card'>
        <div className='card-body'>
          <Player label='Winner' score={winner.score} profile={winner.profile} />
        </div>
      </div>
      </div>
      <div className='col-md'>
      <div className='card'>
      <div className='card-body'>
        <Player label='Loser' score={loser.score} profile={loser.profile} />
      </div>
      </div>
      </div>
      </div>
    )
  }
}

module.exports = Results