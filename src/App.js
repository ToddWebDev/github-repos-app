import React, { Component } from 'react';
import './App.css';

function Nav (props) {
  return (
    <ul>
      {props.list.map((name) => (
        <li key={name}>
          {name}
        </li>
      ))}
    </ul>
  )
}

function ReposList (props) {
      return (
        <ul>
          {props.list.map((repo) => (
            <li key={repo}>
              <span>{repo}</span>
              <button onClick={() => props.onRemoveRepo(repo)}>X</button>
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
  }
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
        <div className="jumbotron">
          <h1 className="display-4">Hello, from the React World!</h1>
          <p className="lead">To get started, caffiene up mate <code>src/App.js</code> and save to reload.</p>
          <HandleComponent handle={this.state.handle} />
          <a className="btn btn-primary btn-lg" href="" role="button">Learn more</a>
        </div>
        <Nav list={this.state.nav} />
        <ReposList
          list={this.state.repos}
          onRemoveRepo={this.handleRemoveRepo}
        />
      </div>
    );
  }
}

export default App;
