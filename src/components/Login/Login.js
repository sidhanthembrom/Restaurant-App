import {Component} from 'react'
import '../../App.css'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {username: '', password: '', hasError: false, errorMsg: ''}

  handleName = e => {
    console.log(e.target.value)
    this.setState({username: e.target.value})
  }

  handlePwd = e => {
    console.log(e.target.value)
    this.setState({password: e.target.value})
  }

  handleSubmit = async e => {
    const {username, password} = this.state
    e.preventDefault()
    // console.log('done')
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()

    if (response.ok) {
      // console.log(data.jwt_token)
      Cookies.set('jwt_token', data.jwt_token, {expires: 7})

      const {history} = this.props
      history.replace('/')
    } else {
      // console.log(data.error_msg)
      this.setState({hasError: true, errorMsg: data.error_msg})
    }
  }

  render() {
    const {hasError, errorMsg, username, password} = this.state

    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="loginpage-container">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">USERNAME</label>
          <input
            id="username"
            type="text"
            placeholder="Enter Name"
            onChange={this.handleName}
            value={username}
          />
          <label htmlFor="password">PASSWORD</label>
          <input
            id="password"
            type="password"
            placeholder="Enter Password"
            onChange={this.handlePwd}
            value={password}
          />
          <div className="submit-btn-container">
            <button type="submit">Login</button>
            {hasError ? <p>{errorMsg}</p> : null}
          </div>
        </form>
      </div>
    )
  }
}

export default Login
