import React, { Component } from 'react'
import './App.css'
var Nav = require('./Nav')
var Home = require('./Home')
var Battle = require('./Battle')
var Popular = require('./Popular')
var ReactRouter = require('react-router-dom')
var Router = ReactRouter.BrowserRouter
var Route = ReactRouter.Route
var Switch = ReactRouter.Switch


//Stateless Functional Components
function HandleComponent (props) {
  return <p>{props.handle}</p>
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      repos: [],
      handle: '@toddwebdev',
      activeLanguage: 'All',
      loading: true
    }
    
    this.handleSelectLanguage = this.handleSelectLanguage.bind(this)
    this.fetchRepos = this.fetchRepos.bind(this)
    this.handleRemoveRepo = this.handleRemoveRepo.bind(this)
    
    console.log('--constructor--')
  }
  
  //Component Lifecycle hooks
  componentDidMount() {
    console.log('--componentDidMount--')
    window.API = {
      fetchPopularRepos(language = 'all') {
        const encodedURI = encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)
        
        return fetch(encodedURI)
          .then((data) => data.json())
          .then((repos) => repos.items)
          .catch((error) => {
            console.warn(error)
            return null
          });
      }
    }
    this.fetchRepos(this.state.activeLanguage)
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('--componentDidUpdate--')
    if (prevState.activeLanguage !== this.state.activeLanguage) {
      this.fetchRepos(this.state.activeLanguage)
    }
  }
  componentWillUnmount() {
    console.log('--componentWillUnmount--')
  }
  
  fetchRepos(lang) {
    this.setState({
      loading: true
    })
    window.API.fetchPopularRepos(lang)
      .then((data) => {
        this.setState({
          loading: false,
          repos: data
        })
      })
  }

  //Handlers
  handleRemoveRepo(name) {
    this.setState((currentState) => {
      return {
        repos: currentState.repos.filter((repo) => repo.name !== name)
      }
    })
  }
  handleSelectLanguage(lang) {
    this.setState({
      activeLanguage: lang
    })
  }
  
  render() {
    return (
      <Router>
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <div className="jumbotron text-center">
                <h1 className="display-4">Hello, from the React World!</h1>
                <p className="lead">To get started, caffiene up mate <code>src/App.js</code> and save to reload.</p>
                <HandleComponent handle={this.state.handle} />
              </div>
            </div>
          </div>
          <Nav />
          <br/><br/>
          <div className="row">
            <div className="col-sm text-center">
              <Switch>
                <Route exact path ='/' component={Home} />
                <Route path='/battle' component={Battle} />
                <Route path='/popular' component={Popular} />
                <Route render={function() {
                    return <p>Not Found</p>
                  }} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
