import React from 'react';
import './Budget.css';
import { Fetch } from '../FetchHelper.js'
import { Link } from 'react-router-dom'


class Budget extends React.Component {
  state = {
    budget: null
  }

  componentDidMount() {
    this.getBudget()
  }

  getBudget() {
    Fetch('http://localhost:3000/budget', 'get')
    .then(([status, response]) => {
      if(status === 200) {
        this.setState({budget: response.budget})
      } else {
        console.log('uh oh')
      }
    })
  }

  render() {
    return (
      <div>
        {
          this.state.budget ?
          <p>{this.state.budget.type}</p> :
          <Link className="App-link" to="/new_budget" > New Budget </Link>
        }
      </div>
    )
  }
}

export default Budget;
