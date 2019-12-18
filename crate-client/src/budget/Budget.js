import React from 'react';
import './Budget.css';
import { Fetch } from '../FetchHelper.js'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';

class Budget extends React.Component {
  state = {
    income: 0,
    categories: []
  }

  componentDidMount() {
    this.getBudget()
  }

  getBudget() {
    Fetch('http://localhost:3000/budget', 'get')
    .then(([status, response]) => {
      if(status === 200) {
        this.setState({
          income: response.income,
          categories: response.categories
        })
      } else {
        console.log('uh oh')
      }
    })
  }

  listCategories() {
    console.log('adsg')
    return this.state.categories.map((category) => {
      return <p key={category.label}>{category.label} - {category.monthly_amount}</p>
    })
  }

  render() {
    return (
      <Grid container justify="center" alignItems="center">
        <header className="App-header">
          <p>
            Budget
          </p>
        </header>
        { this.state.income }
        {
          this.state.categories.length === 0 ?
          <Link className="App-link" to="/new_budget" > New Budget </Link> :
          this.listCategories()
        }
      </Grid>
    )
  }
}

export default Budget;
