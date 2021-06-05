import React from 'react';
import './App.scss';
import Login from './Login.js'
import Terminal from './Terminal.js'
// import { Fetch } from './FetchHelper.js'
import { connect } from "react-redux";
import { setAuthenticated, setAnimate } from "./actions/index";

const mapStateToProps = state => {
  return {
    authenticated: state.authenticated,
    name: state.name,
    animate: state.animate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAuthenticated: authenticated => (
      dispatch(setAuthenticated(authenticated))
    ),
    setAnimate: animate => (
      dispatch(setAnimate(animate))
    )
  };
}

class App extends React.Component {
  state = {
    text: '',
    path: ''
  }

  componentDidUpdate() {
    this.props.setAnimate(false)
  }

  // logout() {
  //   Fetch('logout', 'post')
  //   .then(([status, _response]) => {
  //     if(status === 200) {
  //       console.log('logged out')
  //       this.props.setAuthenticated({authenticated: false, name: ''})
  //     } else {
  //       console.log('uh oh')
  //     }
  //   })
  // }

  onEnterCommand(command) {
    if (command === 'login') {
      this.setState({path: 'login'})
    }
  }

  renderTerminal() {
    return <Terminal
      onEnter={(command) => this.onEnterCommand(command)}
      animate={this.props.animate}
    />
  }

  renderLogin() {
    return <Login
      exit={() => this.setState({path: ''})}
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
