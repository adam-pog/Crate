import React from 'react';
import './Budget.css';
import { Fetch } from '../FetchHelper.js'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';


const styles = theme => ({
  budget: {
    padding: theme.spacing(5),
    textAlign: 'center'
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main
  },
  card: {
    width: 700,
    height: 60,
    margin: theme.spacing(1.5),
    backgroundColor: '#393F4A'
  },
  cardContent: {
    textAlign: 'start',
    paddingTop: 5
  },
  progress: {
    margin: theme.spacing(1, 0),
    width: 550
  },
  primaryAmount: {
    flex: 1
  },
  progressBox: {
    flex: 1
  },
  progressAmount: {
    color: '#00e676'
  }
});

const ColorLinearProgress = withStyles({

  barColorPrimary: {
    backgroundColor: '#00e676',
    // backgroundColor: '#f50057',
  },
})(LinearProgress);

class Budget extends React.Component {
  state = {
    income: 0,
    remaining: 0,
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
        <Card key={category.label} className={this.props.classes.card} raised={true}>
          <CardContent className={this.props.classes.cardContent}>
            <Grid container direction='row' alignItems='center'>
              <Grid className={this.props.classes.primaryAmount}>
                <Typography component='h1' variant='h6' color='textPrimary'>
                  {category.label}
                </Typography>
              </Grid>
              <Grid >
                <Typography component='h1' variant='h6' color='textPrimary'>
                  ${category.monthly_amount}
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Box className={this.props.classes.progressBox}>
                <ColorLinearProgress variant="determinate" value={80} className={this.props.classes.progress}/>
              </Box>
              <Typography component='p' className={this.props.classes.progressAmount} >
                ${category.monthly_amount}
              </Typography>
            </Grid>
          </CardContent>
        </Card>
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
                Monthly: ${ this.state.income }
              </Typography>
              <Typography component='h1' variant="h4" color='textPrimary'>
                Remaining: ${ this.state.remaining }
              </Typography>
            </Grid>
            <Grid item >
              {
                this.listCategories(classes)
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

export default withStyles(styles)(Budget);

// <Grid
//   container
//   justify="flex-end"
//   alignItems="flex-end"
// >
  // <Avatar className={classes.avatar}>
  //   <EditIcon className={classes.icon} />
  // </Avatar>
// </Grid>
//
