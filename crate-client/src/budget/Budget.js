import React from 'react';
import './Budget.css';
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import Styles from './BudgetStyles'
import { gql, useQuery } from '@apollo/client';

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

const ColorLinearProgress = withStyles({

  barColorPrimary: {
    backgroundColor: '#00e676',
    // backgroundColor: '#f50057',
  },
})(LinearProgress);

const listCategories = (classes, categories) => {
  return categories.map((category) => {
    return (
      <Card key={category.label} className={classes.card} raised={true}>
        <CardContent className={classes.cardContent}>
          <Grid container direction='row'>
            <Box className={classes.progressBox}>
              <Grid className={classes.mainBudgetInfoGrid}>
                <Grid container direction='row' alignItems='center'>
                  <Grid className={classes.primaryAmount}>
                    <Typography component='h1' variant='h6' color='textPrimary'>
                      {category.label}
                    </Typography>
                  </Grid>
                  <Grid>
                    <Typography component='h1' variant='h6' color='textPrimary'>
                      ${category.monthlyAmount}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Box className={classes.progressBox}>
                    <ColorLinearProgress variant="determinate" value={category.progress} className={classes.progress}/>
                  </Box>
                  <Typography component='p' className={classes.progressAmount} >
                    ${category.spent}
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            <Grid className={classes.arrowGrid}>
                <Link to={`/budget_categories/${category.id}`} className={classes.arrowLink}>
                  <IconButton variant="outlined" className={classes.arrowButton}>
                    <ArrowForwardIosIcon  className={classes.arrow}/>
                  </IconButton>
                </Link>
            </Grid>

          </Grid>
        </CardContent>


      </Card>
    )
  })
}

const remaining = (data) => {
  const reducer = (sum, category) => (sum + category.spent)
  const spent = data.currentUser.budgetCategories.reduce(reducer, 0)

  return data.currentUser.income - spent
}

function Budget({classes}) {
  const { loading, error, data } = useQuery(getBudgetCategories, {
    fetchPolicy: 'network-only'
  });
  // console.log('error: ', networkStatus)
  // console.log('data: ', data)

  if (loading) return '';
  if (error) return '';

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
              Monthly: ${ data.currentUser.income }
            </Typography>
            <Typography component='h1' variant="h4" color='textPrimary'>
              Remaining: ${ remaining(data) }
            </Typography>
          </Grid>
          <Grid item >
            {
              listCategories(classes, data.currentUser.budgetCategories)
            }
          </Grid>
          <Grid container justify='center'>
            <Link to="/new_budget" >
              <IconButton className={classes.addButton} size='small'>
                <AddIcon fontSize='large' className={classes.addIcon} />
              </IconButton>
            </Link>
          </Grid>
        </Grid>
    </Grid>
  )
}

export default withStyles(Styles)(Budget);
