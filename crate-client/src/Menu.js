import React from 'react';
import './Menu.css';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Badge from '@material-ui/core/Badge';
import HomeIcon from '@material-ui/icons/Home';


const useStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.primary.contrastText,
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
        <div className={classes.home}>
          <Link to="/" component={RouterLink} className={classes.link}>
            <HomeIcon />
          </Link>
        </div>

        <Link variant="button" className={classes.link} to="/signup" component={RouterLink}>
          Signup
        </Link>
        /
        <Link variant="button" className={classes.link}  to="/login" component={RouterLink}>
          Log In
        </Link>
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
