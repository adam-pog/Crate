import React from 'react';
import './App.scss';
import Login from './Login.js'
import history from './config/history';
import { Route, Router, Switch, Redirect } from 'react-router-dom'
import { connect } from "react-redux";
import { Fetch } from './FetchHelper.js'
import { setAuthenticated } from "./actions/index";

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
        this.props.setAuthenticated({authenticated: false, name: ''})
      } else {
        console.log("Couldn't authenticate")
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
              {
                this.props.authenticated &&
                <p>`Hello ${this.props.name}`</p>
              }
            </Route>
            { !this.props.authenticated &&
              <Route path="/signup">
                <p>Signup Goes here</p>
              </Route>
            }
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
