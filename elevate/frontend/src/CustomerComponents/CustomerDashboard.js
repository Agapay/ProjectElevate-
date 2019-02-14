import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //delete after
import { withRouter } from "react-router";


let MockupData = [ //change the mockup data if you want to test how you will render the subscriptions
    {name: "Amazon", status: "OK", id:0},
    {name: "Apple", status: "OK", id:1},
    {name: "Baskin Robins", status: "OK", id:2},
    {name: "Microsoft", status: "BAD", id:3},
    {name: "Clorox", status: "OK", id:4},
    {name: "1234", status: "BAD", id:5},
    {name: "1000004", status: "BAD", id:6},
]

class BusinessDashboard extends Component {
    constructor(props) {
      super(props);
      this.state = {
        businessEntries: MockupData,
      }
    }

    componentDidMount() {
        document.title = "Elevate - Dashboard";
    }
    
    render() {
      return (
        <div className="dashboard-container">
          <h1>Customers</h1>
            <div>Show subscriptions</div>
        </div>
      );
    }
  }

export default withRouter(BusinessDashboard);