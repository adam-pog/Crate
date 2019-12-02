import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom'
import Login from './Login.js'
import Signup from './Signup.js'
import { Fetch } from './FetchHelper.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.authenticate = this.authenticate.bind(this)
    this.state = { authenticated: this.authenticated() }
  }

  authenticate(email, password) {
    const body = { email: email, password: password }
    Fetch('http://localhost:3000/login', 'post', JSON.stringify(body))
    .then(response => {
      return Promise.all([response.status, response.json()])
    })
    .then(([status, response]) => {
      if(status === 200) {
        window.sessionStorage.setItem("token", response.token);
        this.setState({
          authenticated: !!response.token
        })
      } else {
        console.log('uh oh')
      }
    })
  }

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

  authenticated() {
    return !!window.sessionStorage.getItem("token");
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Router>
            <Link className="App-link" to="/" > Home </Link>
            { !this.state.authenticated &&
              <div>
                <br></br>
                <Link className="App-link" to="/signup" > Sign Up </Link>
                <br></br>
                <Link className="App-link" to="/login" > Login </Link>
              </div>
            }

            <Switch>
              <Route exact path="/">
                <p onClick={() => this.wow() }>Hello</p>
              </Route>
              <Route path="/login">
                <Login authenticate={this.authenticate} authenticated={this.state.authenticated} />
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
