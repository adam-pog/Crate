import React, { useState } from 'react';
import './Login.scss';
import { Fetch } from './FetchHelper.js'
import { addCommandHistory, setAuthenticated, setPath } from "./actions/index";
import { connect } from "react-redux";
import Terminal from './Terminal.js'

const mapDispatchToProps = dispatch => {
  return {
    setAuthenticated: authenticated => (
      dispatch(setAuthenticated(authenticated))
    ),
    addCommandHistory: value => (
      dispatch(addCommandHistory(value))
    ),
    setPath: path => (
      dispatch(setPath(path))
    )
  };
}

const mapStateToProps = state => {
  return { commandHistory: state.commandHistory };
};

function Login({
  addCommandHistory,
  setAuthenticated,
  setPath
}) {
  const emailPrompt = 'Email: ';
  const passwordPrompt = 'Password: ';
  const [email, setEmail] = useState('');
  const [prompt, setPrompt] = useState(emailPrompt);
  const [value, setValue] = useState('');

  const login = (password) => {
    const body = { email: email, password: password }

    Fetch('login', 'post', JSON.stringify(body))
    .then(([status, response]) => {
      if(status === 200) {
        setAuthenticated({authenticated: true, name: response.name});
        addCommandHistory(`--- Authentication Successful ---`)
      } else {
        addCommandHistory(`--- Authentication Failed ---`)
      }
    })
  }

  const exit = () => {
    setPath('/');
  }

  const addHistory = () => {
    if (prompt === emailPrompt) {
      addCommandHistory(`${prompt}${value}`)
    } else if (prompt === passwordPrompt) {
      addCommandHistory(`${prompt}${'•'.repeat(value.length)}`)
    }
  }

  const onEnterCommand = (command) => {
    if (prompt === emailPrompt) {
      setEmail(command);
      setPrompt(passwordPrompt);
      addHistory();
    } else if (prompt === passwordPrompt) {
      login(command)
      addHistory();
      exit();
    }
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();

      onEnterCommand(e.target.value);
      setValue('');
    } else if(e.keyCode === 27) {
      e.preventDefault();

      addHistory();
      exit();
    }
  }

  const shell = () => (
    <input
      type={prompt === passwordPrompt ? 'password' : 'text'}
      className='loginInput'
      onKeyDown={(e) => onKeyDown(e)}
      autoFocus
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
    </input>
  )

  return (
    <Terminal
      onEnter={(command) => onEnterCommand(command)}
      prompt={prompt}
      shell={shell()}
    />
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
