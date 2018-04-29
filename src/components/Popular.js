var React = require('react');
var PropTypes = require('prop-types')
var api = require('../utils/api')

//Stateless Functional Component
function SelectLanguage (props) {
  var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
  return (
    <div className="btn-group" role="group">
      {languages.map((lang) => (
        <button key={lang} type="button" className="btn btn-primary"
          style={lang === props.selectedLanguage ? {color: 'red'} : null}
          onClick={props.onSelect.bind(null, lang)}>
          {lang}
        </button>
      ))}
    </div>
  )
}

function RepoGrid (props) {
  return (
    <ul className='popular-list'>
      {props.repos.map(function (repo, index) {
        return (
          <li key={repo.name} className='popular-item'>
            <div className='popular-rank'>#{index +1}</div>
            <ul className='space-list-items'>
              <li>
                <img 
                  className='avatar'
                  src={repo.owner.avatar_url}
                  alt={repo.owner.avatar_url}
                />
              </li>
              <li><a href={repo.html_url}>{repo.name}</a></li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

//Class Components with State and render
class Loading extends React.Component {
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

RepoGrid.propTypes = {
   repos: PropTypes.array.isRequired,
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

class Popular extends React.Component {
  constructor(props) {
    super();
    this.state = {
      selectedLanguage: 'All',
      repos: null
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }
  componentDidMount () {
    this.updateLanguage(this.state.selectedLanguage)
  }
  updateLanguage(lang) {
    this.setState(function () {
      return {
        selectedLanguage: lang,
        repos: null
      }
    });
    
    api.fetchPopularRepos(lang).then(function(repos){
      this.setState(function(){
        return {
          repos: repos
        }
      })
    }.bind(this))
  }
  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage} />
          {!this.state.repos 
            ? <Loading />
            : <RepoGrid repos={this.state.repos} />}
      </div>
    )
  }
}

module.exports = Popular;