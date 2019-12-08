import React from 'react';
import logo from './logo.svg';
import './Login.css';
import { Fetch } from './FetchHelper.js'
import { Redirect } from 'react-router-dom'
import { setAuthenticated } from "./actions/index";
import { connect } from "react-redux";

const mapDispatchToProps = dispatch => {
  return {
    setAuthenticated: authenticated => (
      dispatch(setAuthenticated(authenticated))
    )
  };
}


class Login extends React.Component {
  state = {
    email: '',
    password: ''
  }

  handleSubmit(e) {
    e.preventDefault();

    const body = { email: this.state.email, password: this.state.password }
    Fetch('http://localhost:3000/login', 'post', JSON.stringify(body))
    .then(response => {
      return Promise.all([response.status, response.json()])
    })
    .then(([status, response]) => {
      if(status === 200) {
        window.sessionStorage.setItem("authenticated", true);
        this.props.setAuthenticated(true)
      } else {
        console.log('uh oh')
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

export default connect(null, mapDispatchToProps)(Login);
