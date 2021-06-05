import React from 'react';
import './App.scss';
import Login from './Login.js'
import Terminal from './Terminal.js'
import { Fetch } from './FetchHelper.js'
import { connect } from "react-redux";
import { setAuthenticated } from "./actions/index";

const mapStateToProps = state => {
  return {
    authenticated: state.authenticated,
    name: state.name
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAuthenticated: authenticated => (
      dispatch(setAuthenticated(authenticated))
    )
  };
}

class App extends React.Component {
  state = {
    text: '',
    path: ''
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
    return <Login click={() => this.setState({path: ''})}/>
  }

  onEnterCommand(command) {
    console.log(command)
    if (command === 'login') {
      this.setState({path: 'login'})
    }
  }

  renderTerminal() {
    return <Terminal
      onEnter={(command) => this.onEnterCommand(command)}
    />
  }

  renderSwitch() {
    switch(this.state.path) {
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
