import React from 'react';
import './Menu.css';
import { Link } from 'react-router-dom'


const Menu = ({authenticated, logout}) => {
  return (
    <div>
      <Link className="App-link" to="/" > Home </Link>
      { !authenticated &&
        <div>
          <br></br>
          <Link className="App-link" to="/signup" > Sign Up </Link>
          <br></br>
          <Link className="App-link" to="/login" > Login </Link>
        </div>
      }
      { authenticated &&
        <div>
          <Link className="App-link" to="/budget" > Budget </Link>
          <br></br>
          <input type="button" value="Logout" onClick={() => logout()}/>
        </div>
      }
    </div>
  )
}

export default Menu;
