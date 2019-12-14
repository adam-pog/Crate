import React from 'react';
import './App.css';
import { Route, Router, Switch, Redirect } from 'react-router-dom'
import Login from './Login.js'
import Signup from './Signup.js'
import { Fetch } from './FetchHelper.js'
import { connect } from "react-redux";
import history from './config/history';
import { setAuthenticated } from "./actions/index";
import Menu from './Menu.js'

const mapStateToProps = state => {
  return { authenticated: state.authenticated, name: state.name };
};

const mapDispatchToProps = dispatch => {
  return {
    setAuthenticated: authenticated => (
      dispatch(setAuthenticated(authenticated))
    )
  };
}


class App extends React.Component {
  wow() {
    Fetch('http://localhost:3000/test', 'post')
    .then(([status, _response]) => {
      if(status === 200) {
        console.log(`you're authenticated ${this.props.name}!`)
      } else {
        console.log('uh oh')
      }
    })
  }

  logout() {
    Fetch('http://localhost:3000/logout', 'post')
    .then(([status, _response]) => {
      if(status === 200) {
        console.log('logged out')
        this.props.setAuthenticated({authenticated: false, name: ''})
      } else {
        console.log('uh oh')
      }
    })
  }

  // const PrivateRoute = ({ component: Component, ...rest }) => (
  //   <Route {...rest} render={(props) => (
  //     this.props.authenticated
  //       ? <Component {...props} />
  //       : <Redirect to='/login' />
  //   )} />
  // )

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Router history={ history }>
            <Menu authenticated={this.props.authenticated} logout={() => this.logout()} />
            <Switch>
              <Route exact path='/'>
                { this.props.authenticated &&
                    <p onClick={() => this.wow() }>Hello {this.props.name}</p>
                }
              </Route>
              { !this.props.authenticated &&
                  <Route path="/login">
                    <Login />
                  </Route>
              }
              { !this.props.authenticated &&
                  <Route path="/signup">
                    <Signup />
                  </Route>
              }
              <Route>
                <Redirect to='/' />
              </Route>
            </Switch>
          </Router>
        </header>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
