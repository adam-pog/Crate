import React, { useState } from 'react';
import './budgetCategories.scss';
import { connect } from "react-redux";
import { gql, useQuery } from '@apollo/client';

const getBudgetCategories = gql`
  query budgetCategories {
    currentUser {
      income
      budgetCategories {
        id
        label
        monthlyAmount
        spent
        progress
      }
    }
  }
`;

function BudgetCategories() {
  const { error, data } = useQuery(getBudgetCategories, {
    fetchPolicy: 'network-only'
  });

  if (data) {
    console.log(data.currentUser)
  }

  return (
    <div className={'budgetCategories'} data-class='container'>
      { error && <p>'Error fetching data'</p> }
      {
        data && data.currentUser.budgetCategories.map((datum, i) => (
          <span className='budgetCategoryContainerWrap'>
            <div key={i} className='budgetCategoryContainer'>
              <p>{datum.label}</p>
            </div>
          </span>
        ))
      }
    </div>
  )
}

export default BudgetCategories;
