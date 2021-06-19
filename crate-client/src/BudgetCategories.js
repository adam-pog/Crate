import React from 'react';
import './BudgetCategories.scss';
import { gql, useQuery } from '@apollo/client';
import history from './config/history';

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

function BudgetCategories({menuState, hideMenu}) {
  const { error, data } = useQuery(getBudgetCategories, {
    fetchPolicy: 'network-only'
  });

  const amountClass = (budgetCategory) => (
    budgetCategory.spent < budgetCategory.monthlyAmount ?
    'budgetColor' : 'overBudgetColor'
  )

  const onClick = () => {
    hideMenu()
    history.push('/add_budget_category')
  }

  const budgetCategoriesPresent = () => (
    data && data.currentUser.budgetCategories.length > 0
  )

  return (
    <div className='budgetCategoriesPage' data-class='container'>
      { error && <p>Error fetching data</p> }
      { budgetCategoriesPresent() &&
        <div className={'budgetCategories'} data-class='container'>
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
      }
      <div
        className={`addBudgetCategory ${budgetCategoriesPresent() ? menuState : ''}`}
        onClick={() => onClick()}
      >
        <div className='addBudgetCategoryButton'>Add Category</div>
      </div>
    </div>
  )
}

export default BudgetCategories;
