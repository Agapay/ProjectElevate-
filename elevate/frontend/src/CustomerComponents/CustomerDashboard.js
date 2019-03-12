import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //delete after
import { withRouter } from "react-router";
import CustomerTableItem from "./CustomerTableItem";
import axios from 'axios';


let MockupData = [ //change the mockup data if you want to test how you will render the subscriptions
    {name: "Oil Change", status: "OK", id:0, quantity: 12},
    {name: "Tire Rotation", status: "OK", id:1, quantity: 1},
    {name: "Alignment", status: "OK", id:2, quantity: 0},
    {name: "Coolent Replacement", status: "BAD", id:3, quantity: 4},
    {name: "Windshield Replacement", status: "OK", id:4, quantity: 6},
    {name: "Blinker Fluid", status: "BAD", id:5, quantity: 1},
    {name: "Dent Fix", status: "BAD", id:6, quantity: 11},
]

class CustomerDashboard extends Component {
    constructor(props) {
      super(props);
      this.state = {
        subscriptions: [],
        subscriptionsSelectedArray: [],
        bid: null, //the id of business the customer belongs to
      }
    }

    componentDidMount() {
        document.title = "Elevate - Dashboard";
        this.getCustomer();
    }

    getSubscriptions() {
      fetch(`/api/users/businesses/${this.state.bid}/subscriptions`, {
          method: 'GET',
          headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
          }
        })
      .then(res => res.json())
      .then(json => {
          if(json.detail) { //error handling
              console.log(json.detail);
              // this.props.logout();
          } else {
              console.log(json); //list of businesses
              let newSubs = [];
              for (const subscription of json.subscriptions) {
                if (this.isSelected(subscription.id)) {
                  subscription.status = subscription.active ? "GOOD" : "BAD";
                  subscription.name = subscription.title;
                  newSubs.push(subscription);
                }
              }
              this.setState({
                subscriptions: newSubs,
              })
          }
      });
    }
  
    isSelected(subscriptionID) { //num = th
      var elementFound = this.state.subscriptionsSelectedArray.find((element) => {
          return element === subscriptionID;
      });
      return elementFound;
    }

    getCustomer() {
      axios({
          method: 'GET',
          url: `/api/users/customer/${this.props.id}`,
          headers: {
              'Authorization': `JWT ${localStorage.getItem('token')}`
          },
      }).then((response) => {
          console.log(response);
          const customer = response.data;
          console.log(customer.subscriptions);
          // if (customer.business !== parseInt(this.props.id)) { //if the customer does not belong to the business log them out
          //     this.props.logout(); 
          // } else {
              this.setState({
                  // api_key: customer.user_api_key,
                  // username: customer.username,
                  // password: "********",
                  // first_name: customer.first_name,
                  // last_name: customer.last_name,
                  // email: customer.email,
                  // phone_number: customer.phone_number,
                  // street_address: customer.street_home_address,
                  // suite_apt: customer.apt_home_address,
                  // city: customer.city_home_address,
                  // state: customer.state_home_address,
                  // postal_code: customer.zip_home_address,
                  subscriptionsSelectedArray: customer.subscriptions,
                  bid: customer.business,
              });
              this.getSubscriptions();
        }).catch((error) => {
            console.log(error);
        });
      }

    render() {
      return (
        <div className="dashboard-container">
        <h1>Subscriptions</h1>
          <table className="col-12" >
            <tbody>
                  <tr>
                    <th className='left_side'>Name</th>
                    <th className="">Status</th>
                    <th className="">View</th>
                    <th className='right_side centered-middle'>Amount</th>
                  </tr>
                  { this.state.subscriptions.map((customerEntry, index) => {
                      return (
                        <CustomerTableItem
                          name={customerEntry.name}
                          status={customerEntry.status}
                          key={"customerEntry"+index}
                          id={this.props.id}
                          amount={customerEntry.amount}
                          sid={customerEntry.id}
                          // link to edit business page
                          // link={<Link to={`/frontend/admin/${this.props.id}/business/${businessEntry.id}`}>View |Edit</Link>}
                        />
                      )
                    })
                  }
              </tbody>
            </table>
        </div>
      );
    }
  }

export default withRouter(CustomerDashboard);
