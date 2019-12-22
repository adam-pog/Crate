import React from 'react';
import './Budget.css';
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
import Styles from './BudgetStyles'

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
          remaining: response.remaining,
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
            <Grid container direction='row'>
              <Box className={this.props.classes.progressBox}>
                <Grid className={this.props.classes.mainBudgetInfoGrid}>
                  <Grid container direction='row' alignItems='center'>
                    <Grid className={this.props.classes.primaryAmount}>
                      <Typography component='h1' variant='h6' color='textPrimary'>
                        {category.label}
                      </Typography>
                    </Grid>
                    <Grid>
                      <Typography component='h1' variant='h6' color='textPrimary'>
                        ${category.monthly_amount}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Box className={this.props.classes.progressBox}>
                      <ColorLinearProgress variant="determinate" value={category.progress} className={this.props.classes.progress}/>
                    </Box>
                    <Typography component='p' className={this.props.classes.progressAmount} >
                      ${category.spent}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              <Grid className={this.props.classes.arrowGrid}>
                <IconButton variant="outlined" className={this.props.classes.arrowButton}>
                  <Link to={`/budget_category/${category.id}`} className={this.props.classes.arrowLink}>
                    <ArrowForwardIosIcon  className={this.props.classes.arrow}/>
                  </Link>
                </IconButton>
              </Grid>

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

export default withStyles(Styles)(Budget);
