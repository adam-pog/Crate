import React from 'react';
import logo from './logo.svg';
import './Signup.css';

class Signup extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  }
  // handleSubmit(event) {
  //   // fetch('http://localhost:8081', {
  //   //   method: 'POST',
  //   //   body: JSON.stringify({
  //   //     location: this.state.location,
  //   //     page: parseInt(this.state.page)
  //   //   })
  //   // })
  //   // .then(response => response.json())
  //   // .then(data => {
  //   //   this.setState({textLines: data.text})
  //   // });
  //
    // fetch('http://localhost:3000/sign_in', {
    //   method: 'post',
    //   headers: {'Content-Type':'application/json'},
    //   body: JSON.stringify({okat: ';fine'})
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log(data)
    // })
  // }

  handleSubmit(e) {
    console.log('asdg')
    e.preventDefault();

    fetch('http://localhost:3000/user', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({user: this.state})
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
  }

  handleFieldChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Sign Up
          </p>
        </header>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input
            name="name"
            placeholder="Name"
            onChange={(e) => this.handleFieldChange(e)}
          />
          <input
            name="email"
            placeholder="Email"
            onChange={(e) => this.handleFieldChange(e)}
          />
          <input
            name="password"
            placeholder="Pasword"
            onChange={(e) => this.handleFieldChange(e)}
          />
          <input
            name="password_confirmation"
            placeholder="Password Confirmation"
            onChange={(e) => this.handleFieldChange(e)}
          />
          <input type="submit" value="Submit"/>
      </form>
      </div>
    )
  }
}

export default Signup;
