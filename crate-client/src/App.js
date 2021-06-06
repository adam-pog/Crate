import React from 'react';
import './App.scss';
import Login from './Login.js'
import Terminal from './Terminal.js'
// import { Fetch } from './FetchHelper.js'
import { connect } from "react-redux";
import { Fetch } from './FetchHelper.js'
import {
  setAuthenticated,
  setAnimate,
  setPath,
  addCommandHistory
} from "./actions/index";

const mapStateToProps = state => {
  return {
    authenticated: state.authenticated,
    name: state.name,
    animate: state.animate,
    path: state.path
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAuthenticated: authenticated => (
      dispatch(setAuthenticated(authenticated))
    ),
    setAnimate: animate => (
      dispatch(setAnimate(animate))
    ),
    setPath: path => (
      dispatch(setPath(path))
    ),
    addCommandHistory: command => (
      dispatch(addCommandHistory(command))
    )
  };
}

class App extends React.Component {
  state = {
    text: ''
  }

  componentDidUpdate() {
    this.props.setAnimate(false)
  }

  logout() {
    Fetch('logout', 'post')
    .then(([status, _response]) => {
      if(status === 200) {
        this.props.addCommandHistory(`--- Successfully logged out ---`)
        this.props.setAuthenticated({authenticated: false, name: ''})
      } else {
        this.props.addCommandHistory('--- error logging out ---');
      }
    })
  }

  onEnterCommand(command) {
    const valid = this.validateCommand(command);
    if (!valid) return;

    if (command === 'login') {
      this.props.setPath('login')
    } else if (command === 'logout') {
      this.logout()
    }
  }

  validateCommand(command) {
    let validCommands = ['login', 'logout']
    let history = [`>${command}`]

    if ((command === 'login') && this.props.authenticated) {
      history = history.concat(`${command}: already logged in`);
    } else if ((command === 'logout') && !this.props.authenticated) {
      history = history.concat(`${command}: not logged in`);
    }

    if (!validCommands.includes(command)) history = history.concat(`${command}: command not found`);

    this.props.addCommandHistory(history);

    return history.length === 1;
  }

  renderTerminal() {
    return <Terminal
      onEnter={ (command) => this.onEnterCommand(command) }
      animate={ this.props.animate }
    />
  }

  renderLogin() {
    return <Login />
  }

  renderSwitch() {
    switch(this.props.path) {
      case 'login':
        return this.renderLogin();
      default:
        return this.renderTerminal()
    }
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
