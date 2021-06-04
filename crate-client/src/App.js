import React from 'react';
import './App.scss';
import Login from './Login.js'
import { Fetch } from './FetchHelper.js'
import { connect } from "react-redux";
import { setAuthenticated, addCommandHistory } from "./actions/index";
import { animateScroll } from 'react-scroll'
import TextareaAutosize from 'react-textarea-autosize';

const mapStateToProps = state => {
  return {
    authenticated: state.authenticated,
    name: state.name,
    commandHistory: state.commandHistory
  };
};

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

class App extends React.Component {
  state = {
    text: '',
    command: ''
  }

  logout() {
    Fetch('logout', 'post')
    .then(([status, _response]) => {
      if(status === 200) {
        console.log('logged out')
        this.props.setAuthenticated({authenticated: false, name: ''})
      } else {
        console.log('uh oh')
      }
    })
  }

  renderLogin() {
    return <Login />
  }

  renderTerminal() {
    return <div className='terminal' id='terminal'>
      <div>
        {this.renderCommandHistory()}
      </div>
      <div className='promptContainer'>
        <h3 className='prompt'>></h3>
        <TextareaAutosize
          spellCheck={false}
          className='shell'
          autoFocus
          value={this.state.text}
          onChange={(e) => this.onChange(e.target.value)}
          onKeyDown={(e) => this.onKeyDown(e)}
        >
        </TextareaAutosize>
      </div>
    </div>
  }

  renderSwitch() {
    switch(this.state.command) {
      case 'login':
        return this.renderLogin();
      default:
        return this.renderTerminal()
    }
  }

  onKeyDown(e) {
    if (e.keyCode === 9) {
      e.preventDefault();
      // setText(text + 'something')
      console.log('implement autocomplete')
    } else if (e.keyCode === 13) {
      e.preventDefault();
      this.props.addCommandHistory([`>${this.state.text}`, `${this.state.text}: command not found`]);
      this.setState({ text: '', command: this.state.text })
    }
  }

  onChange(text) {
    this.setState({ text })
  }

  renderCommandHistory() {
    return this.props.commandHistory.map((command, i) => (
      <p key={i} className='command'>{command}</p>
    ))
  }

  scrollToBottom() {
    animateScroll.scrollToBottom({
      containerId: 'terminal',
      duration: 0,
      offset: 100
    })
  }

  render() {
    return (
      <div className='App'>
        {this.renderSwitch()}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
