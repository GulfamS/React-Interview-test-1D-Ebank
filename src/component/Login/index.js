import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {userId: '', pin: '', submitError: false, errorMsg: ''}

  onClickUserId = event => {
    this.setState({
      userId: event.target.value,
    })
  }

  onClickPin = event => {
    this.setState({
      pin: event.target.value,
    })
  }

  loginSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  loginFail = errorMsg => {
    this.setState({submitError: true, errorMsg})
  }

  bankLogin = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.loginSuccess(data.jwt_token)
    } else {
      this.loginFail(data.error_msg)
    }
  }

  render() {
    const {userId, pin, submitError, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="login-img"
          />
          <form className="login-form" onSubmit={this.bankLogin}>
            <h1 className="login-heading">Welcome Back!</h1>
            <label htmlFor="userid" className="label">
              User ID
            </label>
            <input
              type="text"
              placeholder="Enter User ID"
              id="userid"
              className="input"
              value={userId}
              onChange={this.onClickUserId}
            />
            <label htmlFor="pin" className="label">
              PIN
            </label>
            <input
              type="password"
              placeholder="Enter PIN"
              className="input"
              id="pin"
              value={pin}
              onChange={this.onClickPin}
            />
            <button type="submit" className="login-btn">
              Login
            </button>
            {submitError === true && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
