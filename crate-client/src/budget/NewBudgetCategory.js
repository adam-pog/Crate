import React, { useState } from 'react';
import history from '../config/history'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client';

const CREATE_BUDGET_CATEGORY = gql`
  mutation CreateBudgetCategory($label: String!, $monthlyAmount: Int!) {
    createBudgetCategory(input: { label: $label, monthlyAmount: $monthlyAmount }) {
      budgetCategory {
        id
      }
    }
  }
`;

const styles = theme => ({
  formGrid: {
    marginBottom: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0),
  },
  input: {
    margin: theme.spacing(2, 0)
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  button: {
    margin: theme.spacing(0, 0, 0, 0)
  }
});

const handleSubmit = (e, callback) => {
  e.preventDefault();
  callback()
}

function NewBudgetCategory({classes}) {
  const [label, setLabel] = useState('')
  const [monthlyAmount, setMonthlyAmount] = useState(0)
  const [createBudgetCategory, { data }] = useMutation(CREATE_BUDGET_CATEGORY);

  if (data && !data.loading) history.push('/budget')

  const onSubmit = () => createBudgetCategory({variables: { label: label, monthlyAmount: monthlyAmount }})

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.formGrid}
    >
      <Typography component='h1' variant='h2' color='textPrimary'>
        New Budget
      </Typography>
      <form onSubmit={(e) => handleSubmit(e, onSubmit)} className={classes.form}>
        <Grid container className={classes.input}>
          <TextField
            label="Label"
            variant="outlined"
            name="label"
            autoComplete="off"
            onChange={(e) => setLabel(e.target.value)}
          />
        </Grid>
        <Grid container className={classes.input}>
          <TextField
            variant="outlined"
            label="Monthly Amount"
            name="monthly_amount"
            type="number"
            autoComplete="off"
            onChange={(e) => setMonthlyAmount(parseInt(e.target.value))}
          />
        </Grid>
        <Grid container direction='row'>
          <Grid item xs={3} className={classes.button}>
            <Link to='/budget' style={{ textDecoration: 'none' }}>
              <Button
                fullWidth
                type="button"
                variant="contained"
                color="secondary"
              >
                Cancel
              </Button>
            </Link>
          </Grid>
          <Grid item xs={1}>
          </Grid>
          <Grid item xs={8}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
            >
              Add Budget
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  )
}

const newBudgetCategory = withStyles(styles)(NewBudgetCategory);
export default newBudgetCategory;
