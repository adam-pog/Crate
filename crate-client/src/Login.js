import React, { useState } from 'react';
import './Login.css';
import { Fetch } from './FetchHelper.js'
import { setAuthenticated } from "./actions/index";
import { connect } from "react-redux";
import history from './config/history'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';

const mapDispatchToProps = dispatch => {
  return {
    setAuthenticated: authenticated => (
      dispatch(setAuthenticated(authenticated))
    )
  };
}

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
    margin: theme.spacing(2, 0),
  },
  input: {
    margin: theme.spacing(2, 0)
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  }
});

const handleSubmit = (e, email, password, set) => {
  e.preventDefault();
  console.log(set)
  const body = { email: email, password: password }
  Fetch('login', 'post', JSON.stringify(body))
  .then(([status, response]) => {
    if(status === 200) {
      set({authenticated: true, name: response.name})
      history.push('/')
    } else {
      console.log('uh oh')
    }
  })
}

function Login({classes, setAuthenticated}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.login}
    >
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon className={classes.icon} />
      </Avatar>
      <form onSubmit={(e) => handleSubmit(e, email, password, setAuthenticated)} className={classes.form}>
        <Grid container className={classes.input}>
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid container className={classes.input}>
          <TextField
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.submit}
        >
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </Grid>
      </form>
    </Grid>
  )
}

const login = withStyles(styles)(Login);
export default connect(null, mapDispatchToProps)(login);
