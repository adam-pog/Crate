import React from 'react';
import { Fetch } from '../FetchHelper.js'
import history from '../config/history'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Link } from 'react-router-dom'
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

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
    margin: theme.spacing(0, 0),
  },
  input: {
    margin: theme.spacing(2, 0)
  },
  recurringLabel: {
    color: '#fff'
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  recurringGrid: {
    margin: theme.spacing(2, 0)
  }
});

class NewTransaction extends React.Component {
  state = {
    amount: 0,
    source: '',
    date: new Date(),
    recurring: false,
    description: ''
  }

  budgetCategoryPath() {
    return `/budget_categories/${this.props.match.params.id}`
  }

  handleSubmit(e) {
    e.preventDefault();

    Fetch(
      `http://localhost:3000${this.budgetCategoryPath()}/transactions`,
      'post',
      JSON.stringify({transaction: this.state})
    )
    .then(([status, response]) => {
      if(status === 200) {
        history.push(this.budgetCategoryPath())
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

  handleDateChange(date) {
    this.setState({
      date
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
              <KeyboardDatePicker
                format="MM/dd/yyyy"
                label="Date"
                value={this.state.date}
                onChange={(e) => this.handleDateChange(e)}
              />
            </Grid>
            <Grid container className={classes.input}>
              <TextField
                label="Amount"
                variant="outlined"
                name="amount"
                autoComplete="off"
                onChange={(e) => this.handleFieldChange(e)}
                fullWidth
              />
            </Grid>
            <Grid container className={classes.input}>
              <TextField
                variant="outlined"
                label="Source"
                name="source"
                autoComplete="off"
                onChange={(e) => this.handleFieldChange(e)}
                fullWidth
              />
            </Grid>
            <Grid container className={classes.input}>
              <TextField
                variant="outlined"
                label="Description"
                name="description"
                autoComplete="off"
                onChange={(e) => this.handleFieldChange(e)}
                fullWidth
              />
            </Grid>
            <Grid item className={classes.recurringGrid}>
              <FormControlLabel className={classes.recurringLabel}
                control={
                  <Switch
                    checked={this.state.recurring}
                    onChange={(e) => this.handleCheck(e)}
                    value='recurring'
                    color='primary'
                  />
                }
                label="Recurring"
                />
            </Grid>
            <Grid container direction='row'>
              <Grid item xs={3}>
                <Link to={`${this.budgetCategoryPath()}`} style={{ textDecoration: 'none' }}>
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
                  Add Transaction
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </MuiPickersUtilsProvider>
    )
  }
}

NewTransaction = withStyles(styles)(NewTransaction);
export default NewTransaction;
