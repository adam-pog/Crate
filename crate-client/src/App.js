import React from 'react';
import './App.scss';
import { Route, Router, Switch, Redirect } from 'react-router-dom'
import Login from './Login.js'
import { Fetch } from './FetchHelper.js'
import { connect } from "react-redux";
import history from './config/history';
import { setAuthenticated } from "./actions/index";

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

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route {...rest} render={(props) => (
    authenticated
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
)

class App extends React.Component {
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

  render() {
    return (
      <div className='App'>
        <Router history={ history }>
          <Switch>
            <Route exact path='/'>
              { !this.props.authenticated &&
                <Login />
              }
            </Route>

            <Route>
              <Redirect to='/' />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
