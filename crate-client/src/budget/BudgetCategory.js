import React from 'react';
import { Fetch } from '../FetchHelper.js'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import Styles from './BudgetCategoryStyles'

const ColorLinearProgress = withStyles({

  barColorPrimary: {
    backgroundColor: '#00e676',
    // backgroundColor: '#f50057',
  },
})(LinearProgress);

class BudgetCategory extends React.Component {
  state = {
    label: '',
    monthly_amount: 0,
    spent: 0,
    progress: 0,
    transactions: []
  }

  componentDidMount() {
    this.getTransactions()
  }

  getTransactions() {
    const id = this.props.match.params.id
    const url = `http://localhost:3000/budget_categories/${id}`

    Fetch(url, 'get')
    .then(([status, response]) => {
      if(status === 200) {
        this.setState({
          label: response.label,
          monthly_amount: response.monthly_amount,
          transactions: response.transactions,
          spent: response.spent,
          progress: response.progress
        })
      } else {
        console.log('uh oh')
      }
    })
  }

  category() {
    return (
      <Card key={this.state.label} className={this.props.classes.card} raised={true}>
        <CardContent className={this.props.classes.cardContent}>
          <Grid container direction='row'>

            <Box className={this.props.classes.progressBox} >
              <Grid className={this.props.classes.mainBudgetInfoGrid}>

                <Grid container direction='row' alignItems='center'>

                  <Grid className={this.props.classes.primaryAmount}>
                    <Typography component='h1' variant='h6' color='textPrimary'>
                      {this.state.label}
                    </Typography>
                  </Grid>

                  <Grid>
                    <Typography component='h1' variant='h6' color='textPrimary'>
                      ${this.state.monthly_amount}
                    </Typography>
                  </Grid>

                </Grid>

                <Grid container>
                  <Box className={this.props.classes.progressBox}>
                    <ColorLinearProgress
                      variant="determinate"
                      value={this.state.progress}
                      className={this.props.classes.progress}
                    />
                  </Box>
                  <Typography component='p' className={this.props.classes.progressAmount} >
                    ${this.state.spent}
                  </Typography>
                </Grid>

              </Grid>
            </Box>

            <Grid className={this.props.classes.arrowGrid}>
              <IconButton variant="outlined" className={this.props.classes.arrowButton}>
                <Link to="/" className={this.props.classes.arrowLink}>
                  <ArrowForwardIosIcon  className={this.props.classes.arrow}/>
                </Link>
              </IconButton>
            </Grid>

          </Grid>
        </CardContent>
      </Card>
    )
  }

  transactions() {
    return this.state.transactions.map((transaction) => {
      return (
        <Typography key={transaction.id} component='h1' variant='h6' color='textPrimary'>
          {transaction.description} - {transaction.amount}
        </Typography>
      )
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid
        container
        alignItems="flex-start"
        className={classes.budget}
        justify="center"
        >
          <Grid>
            <Grid item >
              <Typography component='h1' variant="h4" color='textPrimary'>
                Monthly: ${ this.state.monthly_amount }
              </Typography>
              <Typography component='h1' variant="h4" color='textPrimary'>
                Remaining: ${ this.state.monthly_amount - this.state.spent }
              </Typography>
            </Grid>
            <Grid item >
              {
                this.category(classes)
              }
              {
                this.transactions(classes)
              }
            </Grid>
            <Grid container justify='center'>
              <Link to="/new_budget" >
                <Avatar className={classes.avatar}>
                  <AddIcon fontSize='large' />
                </Avatar>
              </Link>
            </Grid>
          </Grid>
      </Grid>
    )
  }
}

export default withStyles(Styles)(BudgetCategory);
