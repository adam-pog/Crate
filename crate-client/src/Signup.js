import React from 'react';
import './Signup.css';
import { Fetch } from './FetchHelper.js'
import history from './config/history'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Avatar from '@material-ui/core/Avatar';

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

class Signup extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  }

  componentDidMount() {
    Fetch('http://localhost:3000/temporary_session', 'get')
  }

  handleSubmit(e) {
    e.preventDefault();

    const user_payload = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation
    }

    Fetch(
      'http://localhost:3000/user',
      'post',
      JSON.stringify({ user: user_payload })
    )
    .then(([status, _response]) => {
      if (status !== 200) {
        window.location.reload(false);
      } else {
        history.push('/login')
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
          <PersonAddIcon className={classes.icon} />
        </Avatar>
        <form onSubmit={(e) => this.handleSubmit(e)} className={classes.form}>
          <Grid container className={classes.input}>
            <TextField
              label="Name"
              variant="outlined"
              name="name"
              onChange={(e) => this.handleFieldChange(e)}
            />
          </Grid>
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
          <Grid container className={classes.input}>
            <TextField
              variant="outlined"
              label="Password Confirmation"
              name="password_confirmation"
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
              Sign Up
            </Button>
          </Grid>
        </form>
      </Grid>
    )
  }
}

Signup = withStyles(styles)(Signup);
export default Signup;
