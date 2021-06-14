import React, { useState } from 'react';
import './budgetCategories.scss';
import { Fetch } from './FetchHelper.js'
import { setAuthenticated } from "./actions/index";
import { connect } from "react-redux";

const mapDispatchToProps = dispatch => {
  return {
    setAuthenticated: authenticated => (
      dispatch(setAuthenticated(authenticated))
    )
  };
}

function BudgetCategories() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={'inputContainer'}>

      <input
        className='loginSubmit'
        type='button'
        value='Submit'
      >
      </input>
    </div>
  )
}

export default connect(null, mapDispatchToProps)(BudgetCategories);
