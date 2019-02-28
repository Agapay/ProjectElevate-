//test
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //delete after
import Portal from "../CommonComponents/Portal.js";
import CustomerDashboard from "./CustomerDashboard";
import CustomerBenefits from "./CustomerBenefits";

class CustomerPortal extends Component {
    constructor(props) {
      super(props);
      this.state = {
        username: localStorage.getItem('username'),
        isLoading: true,
      }
    }

    componentDidMount() {
      //if you not logged in kick out of page or not correct id

        // this.setState({ // for now until we connect with backend
        //   id: this.props.match.params.id,
        //   bid: this.props.match.params.bid,
        //   username: "Admin"
        // })
        // params.id
        // if(localStorage.getItem('username')) {
        //   this.
        // }
        if(localStorage.getItem('token')) {
          fetch('/core/current_user/', {
                      headers: {
                      Authorization: `JWT ${localStorage.getItem('token')}`
                      }
                  })
                      .then(res => res.json())
                      .then(json => {
                          console.log(json);
                          console.log(this.props.match.params.id);

                          if(json.detail || !json.customer || json.id != this.props.match.params.id) {
                            this.logout(); //if the signiture expires, is not a customer, or id does not match -> logout
                          }


                          this.setState({ // for now until we connect with backend
                            username: localStorage.getItem('username'),
                            isLoading: false,
                          })
                        })
                      .catch(err => {
                        console.log("error")
                        console.log(err);
                      });
        } else {
          window.location.replace("/frontend/login");
        }
    }

    logout() {
      // alert("session has expired"); //replace with nice UI if we get the chance
      localStorage.clear(); //removes login token
      window.location.replace("/frontend/login"); //redirects back to login
    }

    render() {
      /*  routes is a list of route objects

          path: the link needed to get to the specific route
          name: the name to be displayed on the sidebar
              if empty, the route will not appear on the sidebar
          selected: shows which tab to highlight if currently on this route
          exact: if true the path has to be exactly as shown.
          main: the main component to render to the right of the sidebar
      */
     let routes = [];
        routes = [ //routes will also become props
          {
            path: `/frontend/customer/${this.props.match.params.id}/dashboard`,
            name: "Dashboard",
            selected: "Dashboard",
            main: () => <CustomerDashboard
                          id={this.props.match.params.id}
                          logout={this.logout}
                        />
          },
          {
            path: `/frontend/customer/${this.props.match.params.id}/subscriptions/${this.props.match.params.sid}`,
            name: "",
            selected: "Dashboard",
            main: () => <CustomerBenefits
                          id={this.props.match.params.id}
                          logout={this.logout}
                        />
          }
        ]
      // }
      return (
          <Portal
            routes={routes}
            //username={this.state.username}
            username="Customer"
            logout={this.logout}
            isLoading={this.state.isLoading}
          />
      );
    }
  }

export default CustomerPortal;
