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
import Budget from './budget/Budget.js'
import NewBudgetCategory from './budget/NewBudgetCategory.js'
import NewTransaction from './budget/NewTransaction.js'
import BudgetCategory from './budget/BudgetCategory.js'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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
      <Grid container id="App">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <Router history={ history }>
          <header>
            <Menu authenticated={this.props.authenticated} logout={() => this.logout()} />
          </header>
          <Grid container className="Main">
            <Switch>
              <Route exact path='/'>
              { !this.props.authenticated &&
                <Login />
              }
              {
                this.props.authenticated &&
                <Grid container justify="center" alignItems="center">
                  <Typography component="h1" variant="h1" color='textPrimary'>
                    {
                      this.props.authenticated &&
                      `Welcome, ${this.props.name}!`
                    }
                    {
                      !this.props.authenticated &&
                      "Hello"
                    }
                  </Typography>
                </Grid>
              }

              </Route>
              { !this.props.authenticated &&
                  <Route path="/signup">
                    <Signup />
                  </Route>
              }
              <PrivateRoute
                path='/budget'
                component={Budget}
                authenticated={this.props.authenticated}>
              </PrivateRoute>
              <PrivateRoute
                path='/new_budget'
                component={NewBudgetCategory}
                authenticated={this.props.authenticated}>
              </PrivateRoute>
              <PrivateRoute
                path='/budget_categories/:id/new_transaction'
                component={NewTransaction}
                authenticated={this.props.authenticated}>
              </PrivateRoute>
              <PrivateRoute
                path='/budget_categories/:id'
                component={BudgetCategory}
                authenticated={this.props.authenticated}>
              </PrivateRoute>
              <Route>
                <Redirect to='/' />
              </Route>
            </Switch>
          </Grid>
        </Router>
      </Grid>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
