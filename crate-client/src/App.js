import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom'
import Login from './Login.js'
import Signup from './Signup.js'
import { Fetch } from './FetchHelper.js'

class App extends React.Component {
  wow() {
    Fetch('http://localhost:3000/test', 'get')
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
            <br></br>
            <Link className="App-link" to="/signup" > Sign Up </Link>
            <br></br>
            <Link className="App-link" to="/login" > Login </Link>

            <Switch>
              <Route exact path="/">
                <p onClick={() => this.wow() }>Hello</p>
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
