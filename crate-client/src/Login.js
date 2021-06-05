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

const mapStateToProps = state => {
  return { commandHistory: state.commandHistory };
};

const handleSubmit = (e, email, password, set) => {
  e.preventDefault();
  console.log(set)
  const body = { email: email, password: password }
  Fetch('login', 'post', JSON.stringify(body))
  .then(([status, response]) => {
    if(status === 200) {
      set({authenticated: true, name: response.name})
    } else {
      console.log('uh oh')
    }
  })
}

function Login({
  setAuthenticated,
  click
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  console.log('watwatat')
  return (
    <div>
      <p style={{color: 'white'}}>Login stuff hewre</p>
      <input type='submit' onClick={() => click()}></input>
    </div>
    // render stuff here?
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
