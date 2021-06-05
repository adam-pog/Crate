import React, { useState, useEffect } from 'react';
import './Terminal.scss';
import { connect } from "react-redux";
import TextareaAutosize from 'react-textarea-autosize';
import { animateScroll } from 'react-scroll'
import { addCommandHistory } from "./actions/index";

const mapDispatchToProps = dispatch => {
  return {
    addCommandHistory: value => {
      dispatch(addCommandHistory(value))
    }
  };
}

const mapStateToProps = state => {
  return { commandHistory: state.commandHistory };
};

const onKeyDown = (e, setText, addCommand, onEnter) => {
  if (e.keyCode === 9) {
    e.preventDefault();

    console.log('implement autocomplete')
  } else if (e.keyCode === 13) {
    e.preventDefault();
    addCommand([`>${e.target.value}`, `${e.target.value}: command not found`]);
    onEnter(e.target.value);
    setText('');
  }
}

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

function Terminal({ commandHistory, addCommandHistory, onEnter }) {
  const [text, setText] = useState('')

  useEffect(() => {
    scrollToBottom();
  })

  return (
    <div className='terminal' id='terminal'>
      <div>
        {renderCommandHistory(commandHistory)}
      </div>
      <div className='promptContainer'>
        <h3 className='prompt'>></h3>
        <TextareaAutosize
          spellCheck={false}
          className='shell'
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => onKeyDown(
            e,
            setText,
            addCommandHistory,
            onEnter
          )}
        >
        </TextareaAutosize>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Terminal);
