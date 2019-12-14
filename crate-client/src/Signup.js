import React from 'react';
import logo from './logo.svg';
import './Signup.css';
import { Fetch } from './FetchHelper.js'
import history from './config/history'


class Signup extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  }

  handleSubmit(e) {
    e.preventDefault();

    const user_payload = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation
    }

    Fetch(
      'http://localhost:3000/user',
      'post',
      JSON.stringify({ user: user_payload })
    )
    .then(([status, _response]) => {
      if (status !== 200) {
        window.location.reload(false);
      } else {
        history.push('/login')
      }
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
            Sign Up
          </p>
        </header>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input
            name="name"
            placeholder="Name"
            onChange={(e) => this.handleFieldChange(e)}
          />
          <input
            name="email"
            placeholder="Email"
            onChange={(e) => this.handleFieldChange(e)}
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            onChange={(e) => this.handleFieldChange(e)}
          />
          <input
            name="password_confirmation"
            placeholder="Password Confirmation"
            type="password"
            onChange={(e) => this.handleFieldChange(e)}
          />
          <input type="submit" value="Submit"/>
        </form>
      </div>
    )
  }
}

export default Signup;
