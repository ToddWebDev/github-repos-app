import React, { Component } from 'react'
import './App.css'
var Nav = require('./Nav')
var Home = require('./Home')
var Battle = require('./Battle')
var Popular = require('./Popular')
var Results = require('./Results')
var ReactRouter = require('react-router-dom')
var Router = ReactRouter.BrowserRouter
var Route = ReactRouter.Route
var Switch = ReactRouter.Switch


//Stateless Functional Components
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      repos: [],
      handle: '@toddwebdev',
      activeLanguage: 'All',
      loading: true
    }   
    console.log('--constructor--')
  }
  
  //Component Lifecycle hooks
  componentDidMount() {
    console.log('--componentDidMount--')
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('--componentDidUpdate--')
  }
  componentWillUnmount() {
    console.log('--componentWillUnmount--')
  }

  render() {
    return (
      <Router>
        <div className="container">
          <Nav />
          <br/><br/>
          <div className="row">
            <div className="col-sm text-center">
              <Switch>
                <Route exact path ='/' component={Home} />
                <Route path='/battle' component={Battle} />
                <Route path='/battle/results' component={Results} />
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
