import React from 'react';
import './Budget.scss';
import { connect } from "react-redux";
import Terminal from './Terminal.js'
import { LS } from './constants/commands'
import { gql, useQuery } from '@apollo/client';
import { addCommandHistory } from "./actions/index";

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

const mapDispatchToProps = dispatch => {
  return {
    addCommandHistory: command => (
      dispatch(addCommandHistory(command))
    )
  };
}

function Budget({
  baseOnEnterCommand,
  addCommandHistory
}) {

  const { error, data } = useQuery(getBudgetCategories, {
    fetchPolicy: 'network-only'
  });

  const listBudgetCategories = (data, error) => {
    console.log(data)
    if (data) {
      data.currentUser.budgetCategories.forEach((category) => {
        addCommandHistory(category.label)
      });
    } else if (error) {
      addCommandHistory('--- error fetching budget categories ---')
    }
  }

  const onEnterCommand = (command) => {
    baseOnEnterCommand(command);

    if (command === LS) {
      listBudgetCategories(data, error)
    }
  }

  return (
    <Terminal
      onEnter={ (command) => onEnterCommand(command) }
    />
  )
}

export default connect(null, mapDispatchToProps)(Budget);
