import React from 'react';
import logo from './logo.svg';
import './Signup.css';
import { Redirect } from 'react-router-dom'

class Signup extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    redirect: false
  }

  handleSubmit(e) {
    e.preventDefault();

    const user_payload = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation
    }

    fetch('http://localhost:3000/user', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ user: user_payload })
    })
    .then(response => response.status)
    .then(status => {
      if (status !== 200) {
        window.location.reload(false);
      } else {
        this.setState({redirect: true})
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
            placeholder="Pasword"
            onChange={(e) => this.handleFieldChange(e)}
          />
          <input
            name="password_confirmation"
            placeholder="Password Confirmation"
            onChange={(e) => this.handleFieldChange(e)}
          />
          <input type="submit" value="Submit"/>
      </form>
      {this.state.redirect && <Redirect to='/login' />}
      </div>
    )
  }
}

export default Signup;
