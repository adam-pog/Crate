import React from 'react';
import logo from './logo.svg';
import './Login.css';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    authenticated: false
  }

  handleSubmit(e) {
    e.preventDefault();

    fetch('https://localhost:3000/login', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      credentials: 'include',
      body: JSON.stringify(this.state)
    })
    .then(response => response.status)
    .then(status => {

    })
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
      </div>
    )
  }
}

export default Login;
