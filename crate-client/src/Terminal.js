import React, { useState, useEffect } from 'react';
import './Terminal.scss';
import { connect } from "react-redux";
import TextareaAutosize from 'react-textarea-autosize';
import { animateScroll } from 'react-scroll'
import { addCommandHistory, setPath } from "./actions/index";

const mapDispatchToProps = dispatch => {
  return {
    addCommandHistory: value => {
      dispatch(addCommandHistory(value))
    },
    setPath: value => {
      dispatch(setPath(value))
    }
  };
}

const mapStateToProps = state => {
  return { commandHistory: state.commandHistory };
};

const renderCommandHistory = (commandHistory) =>  {
  return commandHistory.map((command, i) => (
    <p key={i} className='command'>{command}</p>
  ))
}

const scrollToBottom = () =>  {
  animateScroll.scrollToBottom({
    containerId: 'terminal',
    duration: 0,
    offset: 100
  })
}

function Terminal({
  commandHistory,
  addCommandHistory,
  setPath,
  onEnter,
  animate,
  shell,
  prompt = '>'
}) {
  const [text, setText] = useState('')

  useEffect(() => {
    scrollToBottom();
  })

  const validCommand = (command) => (
    ['login'].includes(command)
  )

  const onKeyDown = (e) => {
    if (e.keyCode === 9) {
      e.preventDefault();

      console.log('implement autocomplete')
    } else if (e.keyCode === 13) {
      e.preventDefault();

      addCommand(e.target.value);
      onEnter(e.target.value);
      setText('');
    } else if(e.keyCode === 27) {
      setPath('/')
    }
  }

  const addCommand = (value) => {
    let history = [`>${value}`]

    if (!validCommand(value)) history = history.concat(`${value}: command not found`)

    addCommandHistory(history)
  }

  const textArea = () => (
    <TextareaAutosize
      spellCheck={false}
      className='shell'
      autoFocus
      value={text}
      onChange={(e) => setText(e.target.value)}
      onKeyDown={(e) => onKeyDown(e)}
    />
  )

  return (
    <div className={`terminal ${animate ? 'animateOpen' : ''}`} id='terminal'>
      <div>
        {renderCommandHistory(commandHistory)}
      </div>
      <div className='promptContainer'>
        <p className='prompt'>{prompt}</p>
        {shell || textArea()}
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Terminal);
