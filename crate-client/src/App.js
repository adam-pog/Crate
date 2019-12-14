import React from 'react';
import './App.css';
import { Route, Router, Switch, Link } from 'react-router-dom'
import Login from './Login.js'
import Signup from './Signup.js'
import { Fetch } from './FetchHelper.js'
import { connect } from "react-redux";
import history from './history';
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
            <Link className="App-link" to="/" > Home </Link>
            { !this.props.authenticated &&
              <div>
                <br></br>
                <Link className="App-link" to="/signup" > Sign Up </Link>
                <br></br>
                <Link className="App-link" to="/login" > Login </Link>
              </div>
            }
            { this.props.authenticated &&
              <div>
                <br></br>
                <input type="button" value="Logout" onClick={() => this.logout()}/>
              </div>
            }
            {/* TODO: make private route wrapper component? */}
            <Switch>
              <Route exact path="/">
                <p onClick={() => this.wow() }>Hello {this.props.name}</p>
              </Route>
              <Route path="/login">
                <Login authenticated={this.props.authenticated} />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
            </Switch>
          </Router>
        </header>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
