import React from 'react';
import './Menu.css';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.primary.contrastText,
    margin: theme.spacing(1)
  },
  icon: {
    color: theme.palette.primary.contrastText,
    margin: theme.spacing(0, 3, 0, 0)
  },
  logout: {
    "&:hover": {
      backgroundColor: theme.palette.primary.dark
    },
    margin: theme.spacing(1)
  },
  home: {
    flexGrow: 1
  }
}));


const Menu = ({authenticated, logout}) => {
  const classes = useStyles();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Grid container alignItems="center" className={classes.home}>
          <Link to="/" component={RouterLink} className={classes.icon}>
            <HomeIcon />
          </Link>
          {
            authenticated &&
            <Grid>
              <Link variant="button" className={classes.link} to="/budget" component={RouterLink}>
                Budget
              </Link>
              |
              <Link variant="button" className={classes.link} to="/budget" component={RouterLink}>
                Transactions
              </Link>
            </Grid>
          }
        </Grid>

        {
          !authenticated &&
          <Grid container justify="flex-end">
            <Grid item>
              <Link variant="button" className={classes.link} to="/signup" component={RouterLink}>
                Sign up
              </Link>
            </Grid>
            /
            <Grid item>
              <Link variant="button" className={classes.link} to="/" component={RouterLink}>
                Log In
              </Link>
            </Grid>
          </Grid>
        }
        {
          authenticated &&
          <Button variant="outlined" className={classes.logout} onClick={ () => logout() } >
            Logout
          </Button>
        }
      </Toolbar>
    </AppBar>


  )
}

export default Menu;


// <div>
//   <Link className="App-link" to="/" > Home </Link>
//   { !authenticated &&
//     <div>
//       <br></br>
//       <Link className="App-link" to="/signup" > Sign Up </Link>
//       <br></br>
//       <Link className="App-link" to="/login" > Login </Link>
//     </div>
//   }
//   { authenticated &&
//     <div>
//       <Link className="App-link" to="/budget" > Budget </Link>
//       <br></br>
//       <input type="button" value="Logout" onClick={() => logout()}/>
//     </div>
//   }
// </div>
