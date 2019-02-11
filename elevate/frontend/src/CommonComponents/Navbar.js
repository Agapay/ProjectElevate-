import React, { Component } from 'react';

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header>
        <div id='logo'>
          <h1><span className='highlight'>AGA</span>PAY</h1>
        </div>
        <nav>
          <ul>
            <li className="current"><a href="/frontend/">Home</a></li>
            <li><a href="/frontend/login">Login</a></li>
          </ul>
        </nav>
    </header>
    )
  }
}

export default Navbar;
