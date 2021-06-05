import React, { useState } from 'react';
import './Login.scss';
import { Fetch } from './FetchHelper.js'
import { setAuthenticated } from "./actions/index";
import { connect } from "react-redux";
import Terminal from './Terminal.js'

const mapDispatchToProps = dispatch => {
  return {
    setAuthenticated: authenticated => (
      dispatch(setAuthenticated(authenticated))
    )
  };
}

const mapStateToProps = state => {
  return { commandHistory: state.commandHistory };
};

const handleSubmit = (email, password, setAuthenticated) => {
  const body = { email: email, password: password }
  Fetch('login', 'post', JSON.stringify(body))
  .then(([status, response]) => {
    if(status === 200) {
      setAuthenticated({authenticated: true, name: response.name})
    } else {
      console.log('uh oh')
    }
  })
}

function Login({
  setAuthenticated,
  exit
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onEnterCommand = (command) => {
    exit()
  }

  return (
    <Terminal
      onEnter={(command) => onEnterCommand(command)}
    />
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
