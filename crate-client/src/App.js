import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom'
import Login from './Login.js'
import Signup from './Signup.js'
import { Fetch } from './FetchHelper.js'
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { authenticated: state.authenticated };
};

class App extends React.Component {
  wow() {
    Fetch('http://localhost:3000/test', 'post')
    .then(response => {
      return Promise.all([response.status, response.json()])
    })
    .then(([status, response]) => {
      if(status === 200) {
        console.log(`you're authenticated ${response.name}!`)
      } else {
        console.log('uh oh')
      }
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Router>
            <Link className="App-link" to="/" > Home </Link>
            { !this.props.authenticated &&
              <div>
                <br></br>
                <Link className="App-link" to="/signup" > Sign Up </Link>
                <br></br>
                <Link className="App-link" to="/login" > Login </Link>
              </div>
            }
            {/* TODO: make private route wrapper component? */}
            <Switch>
              <Route exact path="/">
                <p onClick={() => this.wow() }>Hello</p>
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

export default connect(mapStateToProps)(App);
