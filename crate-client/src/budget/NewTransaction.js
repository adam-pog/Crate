import React from 'react';
import { Fetch } from '../FetchHelper.js'
import history from '../config/history'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const styles = theme => ({
  login: {
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
  recurringLabel: {
    color: '#fff'
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  }
});

class NewTransaction extends React.Component {
  state = {
    amount: 0,
    source: '',
    date: '',
    recurring: false,
    description: ''
  }

  handleSubmit(e) {
    e.preventDefault();

    Fetch(
      'http://localhost:3000/budget_categories',
      'post',
      JSON.stringify({transaction: this.state})
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

  handleCheck(e) {
    this.setState({
      recurring: e.target.checked
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.login}
      >
        <Typography component='h1' variant='h2' color='textPrimary'>
          New Transaction
        </Typography>
        <form onSubmit={(e) => this.handleSubmit(e)} className={classes.form}>
          <Grid container className={classes.input}>
            <TextField
              label="Amount"
              variant="outlined"
              name="amount"
              autoComplete="off"
              onChange={(e) => this.handleFieldChange(e)}
            />
          </Grid>
          <Grid container className={classes.input}>
            <TextField
              variant="outlined"
              label="Source"
              name="source"
              autoComplete="off"
              onChange={(e) => this.handleFieldChange(e)}
            />
          </Grid>
          <Grid container className={classes.input}>
            <TextField
              variant="outlined"
              label="Date"
              name="date"
              autoComplete="off"
              onChange={(e) => this.handleFieldChange(e)}
            />
          </Grid>
          <Grid container className={classes.input}>
            <TextField
              variant="outlined"
              label="Description"
              name="description"
              autoComplete="off"
              onChange={(e) => this.handleFieldChange(e)}
            />
          </Grid>
          <FormControlLabel className={classes.recurringLabel}
            control={
              <Checkbox
                checked={this.state.recurring}
                onChange={(e) => this.handleCheck(e)}
                value='recurring' />
            }
            label="Recurring"
          />
          <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.submit}
          >
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
            >
              Add Transaction
            </Button>
          </Grid>
        </form>
      </Grid>
    )
  }
}

NewTransaction = withStyles(styles)(NewTransaction);
export default NewTransaction;
