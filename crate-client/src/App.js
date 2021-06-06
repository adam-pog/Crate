import React from 'react';
import './App.scss';
import Login from './Login.js'
import Budget from './Budget.js'
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

import { ALL_COMMANDS, AUTHENTICATED_COMMANDS, LOGIN, LOGOUT } from './constants/commands'

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
        this.props.setPath('/')
      } else {
        this.props.addCommandHistory('--- error logging out ---');
      }
    })
  }

  onEnterCommand(command) {
    const valid = this.validateCommand(command);
    if (!valid) return;

    if (command === LOGIN) {
      this.props.setPath('/login')
    } else if (command === LOGOUT) {
      this.logout()
    }
  }

  validateCommand(command) {
    let history = [`~>${command}`]

    if ((command === LOGIN) && this.props.authenticated) {
      history = history.concat(`${command}: already logged in`);
    } else if ((AUTHENTICATED_COMMANDS.includes(command)) && !this.props.authenticated) {
      history = history.concat(`${command}: not logged in`);
    }

    if (!ALL_COMMANDS.includes(command)) history = history.concat(`${command}: command not found`);

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

  renderBudget() {
    return <Budget
      baseOnEnterCommand={(command) => this.onEnterCommand(command)}
    />
  }

  renderSwitch() {
    switch(this.props.path) {
      case '/login':
        return this.renderLogin();
      default:
        return this.props.authenticated ? this.renderBudget() :
                                          this.renderTerminal();
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
