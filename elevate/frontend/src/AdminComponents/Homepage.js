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
              by creating a rewards based subscription. The web application is catered
               towards local businesses but can work for anyone who is trying to retain
               customers and/or create reward programs.
            </p>
            <hr/>
            <h1>How it works?</h1>
            <p>
            The web application consists of three portals: Admin,
            Business, and Customer. The admin portal is essentially a superuser; able
            to add businesses to the system and have analytics of the entire system.
            The business portal allows consumers of Agapay to login and add their customers to
            their custom self-made subscriptions plans. The business can add benefits and compile
            multiple benefits into subscriptions. Lastly, they are able to collect/view payment through
            the portal. The customer portal is therefore for the consumers of the users of the business portal.
            They are able to login and view their subscriptions, view payment status, and quantity of subscriptions.
            </p>
          </div>
        </section>
        </div>
      );
    }
  }

export default Homepage;
