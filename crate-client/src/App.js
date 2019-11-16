import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom'
import Login from './Login.js'
import Signup from './Signup.js'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Router>
            <Link className="App-link" to="/" > Home </Link>
            <br></br>
            <Link className="App-link" to="/signup" > Sign Up </Link>
            <br></br>
            <Link className="App-link" to="/login" > Login </Link>

            <Switch>
              <Route exact path="/">
                <p>Hello</p>
              </Route>
              <Route path="/login">
                <Login />
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

export default App;
