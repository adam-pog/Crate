import React, { useState } from 'react';
import './Login.css';
import { Fetch } from './FetchHelper.js'
import { setAuthenticated } from "./actions/index";
import { connect } from "react-redux";
import history from './config/history'
import TextareaAutosize from 'react-textarea-autosize';


const mapDispatchToProps = dispatch => {
  return {
    setAuthenticated: authenticated => (
      dispatch(setAuthenticated(authenticated))
    )
  };
}

const handleSubmit = (e, email, password, set) => {
  e.preventDefault();
  console.log(set)
  const body = { email: email, password: password }
  Fetch('login', 'post', JSON.stringify(body))
  .then(([status, response]) => {
    if(status === 200) {
      set({authenticated: true, name: response.name})
      history.push('/')
    } else {
      console.log('uh oh')
    }
  })
}

function Login({classes, setAuthenticated}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [text, setText] = useState('')

  const onKeyDown = (e) => {
    if (e.keyCode === 9) {
      e.preventDefault();
      // setText(text + 'something')
      console.log('implement autocomplete')
    }
  }

  const onChange = (value) => {
    setText(value)
  }

  return (
    <div className='terminal'>
      <div className='promptContainer'>
        <h3 className='prompt'>></h3>
        <TextareaAutosize
          spellCheck={false}
          className='shell'
          autoFocus
          value={text}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => onKeyDown(e)}
        >
        </TextareaAutosize>
      </div>
    </div>
  )
}

export default connect(null, mapDispatchToProps)(Login);
