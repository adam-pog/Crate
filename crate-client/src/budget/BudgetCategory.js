import React from 'react';
import { Fetch } from '../FetchHelper.js'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
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
    const url = `${this.currentPath()}`

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

  currentPath() {
    return `/budget_categories/${this.props.match.params.id}`
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
          </Grid>
        </CardContent>
      </Card>
    )
  }

  transactions() {
    return Object.keys(this.state.transactions).sort().reverse().map((date) => {
      return (
        <Box>
          <Card className={this.props.classes.cardHeader}>
            <Typography component='h1' variant='h6' color='textPrimary' className={this.props.classes.cardHeaderText}>
              {date}
            </Typography>
          </Card>
          <Box>
            {
              this.state.transactions[date].map((transaction) => {
                return (
                  <Card key={transaction.id} className={this.props.classes.transactionCard} raised={true}>
                    <Typography component='h1' variant='h6' color='textPrimary'>
                      {transaction.description} ({transaction.source}) - {transaction.amount}
                    </Typography>
                  </Card>
                )
              })
            }
          </Box>
        </Box>
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
            <Grid container direction='row' alignItems='center'>
              <Grid container item xs={4}>
                <Link to="/budget" >
                  <IconButton className={classes.backButton} size='small'>
                    <ArrowBackIcon fontSize='large' className={classes.backIcon} />
                  </IconButton>
                </Link>
              </Grid>
              <Grid container item xs={8}>
                <Grid item>
                  <Typography component='h1' variant="h4" color='textPrimary'>
                    Monthly: ${ this.state.monthly_amount }
                  </Typography>
                  <Typography component='h1' variant="h4" color='textPrimary'>
                    Remaining: ${ this.state.monthly_amount - this.state.spent }
                  </Typography>
                </Grid>
              </Grid>
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
              <Link to={`${this.currentPath()}/new_transaction`} >
                <IconButton className={classes.addButton} size='small'>
                  <AddIcon fontSize='large' className={classes.addIcon} />
                </IconButton>
              </Link>
            </Grid>
          </Grid>
      </Grid>
    )
  }
}

export default withStyles(Styles)(BudgetCategory);
