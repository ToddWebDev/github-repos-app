var React = require('react')
var Link = require('react-router-dom').Link

class Home extends React.Component {
  render () {
    return (
      <div>
        <h1 className="display-4">GitHub Battle</h1>
        <br/>
        <Link className='btn btn-lg btn-primary' to='/battle' >Battle</Link>
      </div>
    )
  }
}

module.exports = Home