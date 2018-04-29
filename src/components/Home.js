var React = require('react')
var Link = require('react-router-dom').Link

class Home extends React.Component {
  render () {
    return (
      <div className="jumbotron text-center">
        <h1 className="display-4">GitHub Battle</h1>
        <Link className='btn btn-lg btn-light' to='/battle' >Battle</Link>
      </div>
    )
  }
}

module.exports = Home