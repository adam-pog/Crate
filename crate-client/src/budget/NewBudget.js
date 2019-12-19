import React from 'react';
import './NewBudget.css';
import { Fetch } from '../FetchHelper.js'
import history from '../config/history'

class NewBudget extends React.Component {
  state = {
    label: '',
    monthly_amount: 0
  }

  handleSubmit(e) {
    e.preventDefault();

    Fetch(
      'http://localhost:3000/budget_category',
      'post',
      JSON.stringify({budget_category: this.state})
    )
    .then(([status, response]) => {
      if(status === 200) {
        history.push('/budget')
      } else {
        console.log('uh oh')
      }
    })
  }

  handleFieldChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return(
      <div className="App">
        <header className="App-header">
          <p>
            New budget
          </p>
        </header>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input
            name="label"
            placeholder="Label"
            onChange={(e) => this.handleFieldChange(e)}
          />
          <input
            name="monthly_amount"
            placeholder="Monthly Amount"
            onChange={(e) => this.handleFieldChange(e)}
          />
          <input type="submit" value="Submit"/>
        </form>
      </div>
    )
  }
}

export default NewBudget;
