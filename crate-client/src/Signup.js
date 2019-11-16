import React from 'react';
import logo from './logo.svg';
import './Signup.css';

class Signup extends React.Component {
  state = {
    text: ''
  }

  handleSubmit(event) {
    // fetch('http://localhost:8081', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     location: this.state.location,
    //     page: parseInt(this.state.page)
    //   })
    // })
    // .then(response => response.json())
    // .then(data => {
    //   this.setState({textLines: data.text})
    // });

    fetch('http://localhost:3000/sign_in', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({okat: ';fine'})
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
  }

  handlePageChange(e) {
    this.setState({
      text: e.target.value
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
        <input
          name="Field"
          placeholder="Type here"
          onChange={(e) => this.handlePageChange(e)}
        />
      <input type="button" value="Submit" onClick={(e) => this.handleSubmit(e)}/>
      </div>
    )
  }
}

export default Signup;
