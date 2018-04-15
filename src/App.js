import React, { Component } from 'react';
import './App.css';

const name = 'ToddWebDev'
const handle = '@toddwebdev'

function NameComponent (props) {
  return <h4>{props.name}</h4>
}

function HandleComponent (props) {
  return <h4>{props.handle}</h4>
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="jumbotron">
          <h1 className="display-4">Hello, from the {name}!</h1>
          <p className="lead">To get started, caffiene up mate <code>src/App.js</code> and save to reload.</p>
          <a className="btn btn-primary btn-lg" href="" role="button">Learn more</a>
        </div>
        <NameComponent name={name} />
        <HandleComponent handle={handle} />
        
      </div>
    );
  }
}

export default App;
