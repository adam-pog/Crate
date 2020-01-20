import React from 'react';
import { Fetch } from '../FetchHelper.js'
import history from '../config/history'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'

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

class NewBudgetCategory extends React.Component {
  state = {
    label: '',
    monthly_amount: 0
  }

  handleSubmit(e) {
    e.preventDefault();

    Fetch(
      'http:/formGrid/localhost:3000/budget_categories',
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
    const { classes } = this.props;

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
        <form onSubmit={(e) => this.handleSubmit(e)} className={classes.form}>
          <Grid container className={classes.input}>
            <TextField
              label="Label"
              variant="outlined"
              name="label"
              autoComplete="off"
              onChange={(e) => this.handleFieldChange(e)}
            />
          </Grid>
          <Grid container className={classes.input}>
            <TextField
              variant="outlined"
              label="Monthly Amount"
              name="monthly_amount"
              autoComplete="off"
              onChange={(e) => this.handleFieldChange(e)}
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
}

NewBudgetCategory = withStyles(styles)(NewBudgetCategory);
export default NewBudgetCategory;
