import React, { Component } from 'react';
import './App.css';

const handle = '@toddwebdev'
const nav = ['All','Javascript','Ruby', 'Python']

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

function HandleComponent (props) {
  return <p>{props.handle}</p>
}

class App extends Component {  
  render() {
    return (
      <div className="App">
        <div className="jumbotron">
          <h1 className="display-4">Hello, from the React World!</h1>
          <p className="lead">To get started, caffiene up mate <code>src/App.js</code> and save to reload.</p>
          <HandleComponent handle={handle} />
          <a className="btn btn-primary btn-lg" href="" role="button">Learn more</a>
        </div>
        <Nav list={nav} />
      </div>
    );
  }
}

export default App;
