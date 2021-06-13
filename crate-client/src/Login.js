import React, { useState } from 'react';
import './Login.scss';
import { Fetch } from './FetchHelper.js'
import { setAuthenticated } from "./actions/index";
import { connect } from "react-redux";

const mapDispatchToProps = dispatch => {
  return {
    setAuthenticated: authenticated => (
      dispatch(setAuthenticated(authenticated))
    )
  };
}

function Login({ setAuthenticated }) {
  const emailPrompt = 'Email: ';
  const passwordPrompt = 'Password: ';
  const [email, setEmail] = useState('');
  const [value, setValue] = useState('');

  const login = (password) => {
    const body = { email: email, password: password }

    Fetch('login', 'post', JSON.stringify(body))
    .then(([status, response]) => {
      if(status === 200) {
        setAuthenticated({authenticated: true, name: response.name});
      } else {
        console.log('Authentication Failed')
      }
    })
  }

  return (
    <p>WAT</p>
  )
}

export default connect(null, mapDispatchToProps)(Login);
