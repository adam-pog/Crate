import React, { useState, useEffect } from 'react';
import './Login.css';
import { Fetch } from './FetchHelper.js'
import { setAuthenticated, addCommandHistory } from "./actions/index";
import { connect } from "react-redux";
import history from './config/history'
import TextareaAutosize from 'react-textarea-autosize';
import { animateScroll } from 'react-scroll'



const mapDispatchToProps = dispatch => {
  return {
    setAuthenticated: authenticated => (
      dispatch(setAuthenticated(authenticated))
    ),
    addCommandHistory: value => {
      dispatch(addCommandHistory(value))
    }
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
      history.push('/')
    } else {
      console.log('uh oh')
    }
  })
}

function Login({
  classes,
  setAuthenticated,
  addCommandHistory,
  commandHistory
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [text, setText] = useState('')

  useEffect(() => {
    scrollToBottom();
  })

  const onKeyDown = (e) => {
    if (e.keyCode === 9) {
      e.preventDefault();
      // setText(text + 'something')
      console.log('implement autocomplete')
    } else if (e.keyCode === 13) {
      e.preventDefault();
      addCommandHistory([`>${text}`, `${text}: command not found`]);
      setText('');
    }
  }

  const onChange = (value) => {
    setText(value)
  }

  const renderCommandHistory = () => (
    commandHistory.map((command, i) => (
      <p key={i} className='command'>{command}</p>
    ))
  )

  const scrollToBottom = () => {
    animateScroll.scrollToBottom({
      containerId: 'terminal',
      duration: 0,
      offset: 100
    })
  }

  return (
    <div className='terminal' id='terminal'>
      <div>
        {renderCommandHistory()}
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
