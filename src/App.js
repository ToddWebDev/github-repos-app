import React, { Component } from 'react';
import './App.css';

//Stateless Functional Components
function Nav (props) {
  const languages = ['All','Javascript','Ruby', 'Python'];
  
  return (
    <div className="btn-group" role="group" aria-label="Basic example">
      {languages.map((lang) => (
        <button key={lang} type="button" className="btn btn-primary" onClick={() => props.onSelectLanguage(lang)}>{lang}</button>
      ))}
    </div>
  )
}

function ReposList (props) {
  return (
    <ul>
      {props.repos.map(({ name, owner, stargazers_count, html_url }) => (
        <li key={name}>
          <span>{name}</span>
          <a className="btn btn-danger btn-sm" onClick={() => props.onRemoveRepo(name)}>X</a>
        </li>
      ))}
    </ul>
  )
}

function HandleComponent (props) {
  return <p>{props.handle}</p>
}

//Class Components with State and render
class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Loading'
    };
  }
  componentDidMount() {
    const stopper = this.state.text + '...';
    this.interval = window.setInterval(() => {
      this.state.text === stopper
        ? this.setState(() => ({ text: 'Loading' }))
        : this.setState((prevState) => ({ text: prevState.text + '.' }))
    }, 300)
  }
  componentWillUnmount() {
    window.clearInterval(this.interval);
  }
  render() {
    return (
      <p>
        {this.state.text}
      </p>
    )
  }
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
              <Nav onSelectLanguage={this.handleSelectLanguage} />
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-sm">
            {this.state.loading === true
              ? <Loading />
              : <div>
                  <h1 style={{textAlign: 'center'}}>
                    {this.state.activeLanguage}
                  </h1>
                  <ReposList repos={this.state.repos} onRemoveRepo={this.handleRemoveRepo} />
                </div>}
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}

export default App;
