import React, { Component } from 'react';
import Navbar from '../CommonComponents/Navbar'

class Homepage extends Component {
    render() {
      return (
        <div className="Homepage">
        <Navbar />
        <section id="content">
          <div>
            <h1>What is project Elevate?</h1>
            <p>
              Project Elevate is a web application meant to enhance customer loyalty
              by creating a rewards based subscription portal that will keep clients
              with the company. Lorem ipsum dolor sit amet, consectetur adipisicing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
              est laborum.
            </p>
            <hr/>
            <h1>How it works?</h1>
            <p>

              Lorem ipsum dolor sit amet, consectetur adipisicing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
              est laborum.
            </p>
          </div>
        </section>
        </div>
      );
    }
  }

export default Homepage;
