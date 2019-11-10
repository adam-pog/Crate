import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  state = {
    text: ''
  }

  handleSubmit(event) {
    console.log('asdsgf')
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
    fetch('http://localhost:3000/wow?text=' +  this.state.text, {
      method: 'GET'
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
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
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

export default App;
