import React from 'react';
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

class Login extends React.Component {
  state = {
    email: '',
    password: ''
  }

  componentDidMount() {
    Fetch('http://localhost:3000/temporary_session', 'get')
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
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.login}
      >
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon className={classes.icon} />
        </Avatar>
        <form onSubmit={(e) => this.handleSubmit(e)} className={classes.form}>
          <Grid container className={classes.input}>
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              onChange={(e) => this.handleFieldChange(e)}
            />
          </Grid>
          <Grid container className={classes.input}>
            <TextField
              variant="outlined"
              label="Password"
              name="password"
              type="password"
              onChange={(e) => this.handleFieldChange(e)}
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
}

Login = withStyles(styles)(Login);
export default connect(null, mapDispatchToProps)(Login);
