var React = require('react')

class Popular extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedLanguage: 'All' 
    }
    
    this.updateLanguage = this.updateLanguage.bind(this)
  }
  
  updateLanguage (lang) {
    this.setState(() => {
      return {
        selectedLanguage: lang
      }
    })
  }  
  
  render() {
    var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']
    
    return (
      <div className="btn-group" role="group">
        {languages.map((lang) => (
          <button key={lang} type="button" className="btn btn-primary"
            onClick={this.updateLanguage.bind(null, lang)}>{lang}</button>
        ))}
      </div>
    )
  }
}

module.exports = Popular;