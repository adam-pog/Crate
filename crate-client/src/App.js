import React from 'react';
import './App.scss';
import Login from './Login.js'
import BudgetCategories from './budgetCategories.js'
import history from './config/history';
import { Route, Router, Switch, Redirect, Link } from 'react-router-dom'
import { connect } from "react-redux";
import { Fetch } from './FetchHelper.js'
import { setAuthenticated } from "./actions/index";

const mapStateToProps = state => {
  return {
    authenticated: state.authenticated
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
    menuState: 'hidden'
  }

  logout() {
    Fetch('logout', 'post')
    .then(([status, _response]) => {
      if(status === 200) {
        this.props.setAuthenticated({authenticated: false, name: ''})
        this.setState({ menuState: 'hidden' })
      } else {
        console.log("Couldn't authenticate")
      }
    })
  }

  onDoubleClick(target) {
    console.log('target: ', target)
    if (!this.props.authenticated) return;

    if (target.dataset.class === 'container') {
      if (this.state.menuState === 'hidden' || this.state.menuState === 'closeMenu') {
        this.setState({ menuState: 'openMenu' })
      } else {
        this.setState({ menuState: 'closeMenu' })

      }
    }
  }

  render() {
    return (
        <Router history={ history }>
          {
            this.props.authenticated &&
            <ol className={'menu'} data-class='container' onDoubleClick={(e) => this.onDoubleClick(e.target)}>
              <li className={`listItem ${this.state.menuState}`}>
                <Link className="menuLink" to="/budget_categories" > Home </Link>
              </li>
              <li className={`listItem ${this.state.menuState}`}>
                <a className="menuLink"  onClick={() => this.logout()}> Logout </a>
              </li>
            </ol>
          }
          <div
            className='App'
            onDoubleClick={(e) => this.onDoubleClick(e.target)}
            data-class='container'
          >

            <Switch>
              <Route exact path='/login'>
                { !this.props.authenticated &&
                  <Login />
                }
              </Route>
              { !this.props.authenticated &&
                <Route path="/signup">
                  <p>Signup Goes here</p>
                </Route>
              }

              <PrivateRoute
                path='/budget_categories'
                component={BudgetCategories}
                authenticated={this.props.authenticated}>
              </PrivateRoute>

              <Route>
                { !this.props.authenticated &&
                  <Redirect to='/login' />
                }
                { this.props.authenticated &&
                  <Redirect to='/budget_categories' />
                }

              </Route>
            </Switch>
          </div>
        </Router>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
