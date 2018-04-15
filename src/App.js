import React, { Component } from 'react';
import './App.css';

//Stateless Functional Components
function Nav (props) {
  return (
    <div className="btn-group" role="group" aria-label="Basic example">
      {props.list.map((name) => (
        <button key={name} type="button" className="btn btn-primary">{name}</button>
      ))}
    </div>
  )
}

function ReposList (props) {
      return (
        <ul>
          {props.list.map((repo) => (
            <li key={repo}>
              <span>{repo}</span>
              <a className="btn btn-danger btn-sm" onClick={() => props.onRemoveRepo(repo)}>X</a>
            </li>
          ))}
        </ul>
      )
    }

function HandleComponent (props) {
  return <p>{props.handle}</p>
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nav: ['All','Javascript','Ruby', 'Python'],
      repos: ['JS','React','Vue', 'Angular'],
      handle: '@toddwebdev'
    }
    
    this.handleRemoveRepo = this.handleRemoveRepo.bind(this)
    
    console.log('--constructor--')
  }
  
  //Component Lifecycle hooks
  componentDidMount() {
    console.log('--componentDidMount--')

  }
  componentDidUpdate() {
    console.log('--componentDidUpdate--')
  }
  componentWillUnmount() {
    console.log('--componentWillUnmount--')
  }
  
  //Handlers
  handleRemoveRepo(name) {
    this.setState((currentState) => {
      return {
        repos: currentState.repos.filter((repo) => repo !== name)
      }
    })
  }
  
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <div className="jumbotron ">
                <h1 className="display-4">Hello, from the React World!</h1>
                <p className="lead">To get started, caffiene up mate <code>src/App.js</code> and save to reload.</p>
                <HandleComponent handle={this.state.handle} />
                <a className="btn btn-primary btn-lg" href="" role="button">Learn more</a>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm">
              <Nav list={this.state.nav} />
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-sm">
              <ReposList
                list={this.state.repos}
                onRemoveRepo={this.handleRemoveRepo}
              />
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}

export default App;
