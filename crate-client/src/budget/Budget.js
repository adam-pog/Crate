import React from 'react';
import './Budget.css';
import { Fetch } from '../FetchHelper.js'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import EditIcon from '@material-ui/icons/Edit';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
  budget: {
    padding: theme.spacing(5),
    textAlign: 'center'
  },
  avatar: {
    margin: theme.spacing(0.5, 1, 0, 0),
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(3),
    height: theme.spacing(3)
  }
});

class Budget extends React.Component {
  state = {
    income: 0,
    categories: []
  }

  componentDidMount() {
    this.getBudget()
  }

  getBudget() {
    Fetch('http://localhost:3000/budget', 'get')
    .then(([status, response]) => {
      if(status === 200) {
        this.setState({
          income: response.income,
          categories: response.categories
        })
      } else {
        console.log('uh oh')
      }
    })
  }

  listCategories() {
    return this.state.categories.map((category) => {
      return (
        <Grid container key={category.label} direction="row">
          <Avatar className={this.props.classes.avatar}>
            <EditIcon className={this.props.classes.icon} fontSize="small" />
          </Avatar>
          <Typography component='h1' variant='h5' color='textPrimary'>
            {category.label} - {category.monthly_amount}
          </Typography>
        </Grid>
      )
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container>
        <Grid
          container
          alignItems="flex-start"
          className={classes.budget}
          justify="center"
          >
            <Grid>
              <Grid item >
                <Typography component='h1' variant="h3" color='textPrimary'>
                  Income: { this.state.income }
                </Typography>
              </Grid>
              <Grid item >
                {
                  this.listCategories(classes)
                }
              </Grid>
              <Grid item >
                <Link to="/new_budget" > New Category </Link>
              </Grid>
            </Grid>
        </Grid>
        <Grid
          container
          justify="flex-end"
          alignItems="flex-end"
        >
          <Avatar className={classes.avatar}>
            <EditIcon className={classes.icon} />
          </Avatar>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(Budget);
