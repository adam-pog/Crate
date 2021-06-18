import React from 'react';
import './budgetCategories.scss';
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

  const amountClass = (budgetCategory) => (
    budgetCategory.spent < budgetCategory.monthlyAmount ?
    'budgetColor' : 'overBudgetColor'
  )

  return (
    <div className={'budgetCategories'} data-class='container'>
      { error && <p>'Error fetching data'</p> }
      {
        data && data.currentUser.budgetCategories.map((datum, i) => (
          <span key={i} className='budgetCategoryContainerWrap'>
            <div className='budgetCategoryContainer'>
              <p className='categoryLabel'>{datum.label}</p>
              <p className={`categoryAmount ${amountClass(datum)}`}>{datum.spent} / {datum.monthlyAmount}</p>
            </div>
          </span>
        ))
      }
    </div>
  )
}

export default BudgetCategories;
