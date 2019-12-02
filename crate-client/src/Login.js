import React from 'react';
import logo from './logo.svg';
import './Login.css';
import { Fetch } from './FetchHelper.js'
import { Redirect } from 'react-router-dom'

class Login extends React.Component {
  state = {
    email: '',
    password: ''
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.authenticate(this.state.email, this.state.password);
  }

  handleFieldChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Login
          </p>
        </header>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input
            name="email"
            placeholder="Email"
            onChange={(e) => this.handleFieldChange(e)}
          />
          <input
            name="password"
            placeholder="Pasword"
            onChange={(e) => this.handleFieldChange(e)}
          />
          <input type="submit" value="Submit"/>
        </form>
        {this.props.authenticated && <Redirect to='/' />}
      </div>
    )
  }
}

export default Login;
