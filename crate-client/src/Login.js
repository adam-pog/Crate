import React from 'react';
import './Login.css';
import { Fetch } from './FetchHelper.js'
import { setAuthenticated } from "./actions/index";
import { connect } from "react-redux";
import history from './config/history'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const mapDispatchToProps = dispatch => {
  return {
    setAuthenticated: authenticated => (
      dispatch(setAuthenticated(authenticated))
    )
  };
}

const styles = theme => ({
  typography: {
    color: theme.palette.primary.contrastText
  },
  login: {
    marginBottom: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(2, 0),
  },
  input: {
    margin: theme.spacing(2, 0)
  },
  textField: {
    background: theme.palette.primary.contrastText
  }
});

class Login extends React.Component {
  state = {
    email: '',
    password: ''
  }

  handleSubmit(e) {
    e.preventDefault();

    const body = { email: this.state.email, password: this.state.password }
    Fetch('http://localhost:3000/login', 'post', JSON.stringify(body))
    .then(([status, response]) => {
      if(status === 200) {
        this.props.setAuthenticated({authenticated: true, name: response.name})
        history.push('/')
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
      <Grid container justify="center" alignItems="center" className={classes.login}>
        <Typography component="h1" variant="h4" className={classes.typography}>
          Login
        </Typography>
        <form onSubmit={(e) => this.handleSubmit(e)} className={classes.form}>
          <Grid container className={classes.input}>
            <TextField
              className={classes.textField}
              variant="filled"
              name="email"
              placeholder="Email"
              onChange={(e) => this.handleFieldChange(e)}
            />
          </Grid>
          <Grid container className={classes.input}>
            <TextField
              className={classes.textField}
              variant="filled"
              name="password"
              placeholder="Pasword"
              type="password"
              onChange={(e) => this.handleFieldChange(e)}
            />
          </Grid>
          <Grid container justify="center" alignItems="center" className={classes.submit}>
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
}

Login = withStyles(styles)(Login);
export default connect(null, mapDispatchToProps)(Login);
