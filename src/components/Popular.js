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
            <div className='popular-rank'>#${index +1}</div>
            <ul className='space-list-items'>
              <li>
                <img 
                  className='avatar'
                  src={repo.owner.avatar_url}
                />
              </li>
              <li>{repo.name}</li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

RepoGrid.propTypes = {
  // repos: PropTypes.array.isRequired;
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
            ? <p>Loading</p>
            : <RepoGrid repos={this.state.repos} />}
      </div>
    )
  }
}

module.exports = Popular;