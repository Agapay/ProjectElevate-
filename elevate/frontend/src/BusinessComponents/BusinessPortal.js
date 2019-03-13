import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'; //delete after
import Portal from '../CommonComponents/Portal.js';
import BusinessDashboard from './BusinessDashboard';
import BusinessSubscriptions from './BusinessSubscriptions';
import AddCustomer from './AddCustomer';
import AddSubscription from './AddSubscription';
import AddBenefit from './AddBenefit';
import EditCustomer from './EditCustomer';
import EditSubscription from './EditSubscription';
import EditBenefit from './EditBenefit';
import NMISetupStep1 from './NMISetupStep1';
import NMISetupStep2 from './NMISetupStep2';
import BusinessBenefits from './BusinessBenefits.js';
import EnlistSubscriptions from './EnlistSubscriptions';

class BusinessPortal extends Component {
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
                          if(json.detail || !json.business || json.id != this.props.match.params.id) {
                            this.logout(); //if the signiture expires, is not an admin, or id does not match -> logout
                          }
                          // localStorage.setItem('username', json.username)
                      // this.setState({ username: json.username });
                          // window.location.replace("/frontend/admin/0/dashboard");
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
      // if (true) {
        routes = [ //routes will also become props
          // {
          //   path: `/frontend/admin/${this.props.match.params.id}`,
          //   name: "",
          //   selected: "Dashboard",
          //   exact: true,
          //   main: () => <AdminDashboard id={this.props.match.params.id}/>
          // }
          {
            path: `/frontend/business/${this.props.match.params.id}/dashboard`,
            name: "Dashboard",
            selected: "Dashboard",
            main: () => <BusinessDashboard id={this.props.match.params.id}/>
          },
          {
            path: `/frontend/business/${this.props.match.params.id}/subscriptions`,
            name: "Subscriptions",
            selected: "Subscriptions",
            main: () => <BusinessSubscriptions id={this.props.match.params.id}/>
          },
          {
            path: `/frontend/business/${this.props.match.params.id}/benefits`,
            name: "Benefits",
            selected: "Benefits",
            main: () => <BusinessBenefits id={this.props.match.params.id}/>
          },
          {
            path: `/frontend/business/${this.props.match.params.id}/add-customer`,
            name: "Add Customer",
            selected: "Add Customer",
            main: () =>
              <AddCustomer
                NMILink={`/frontend/business/${this.props.match.params.id}/NMIsetup-1`}
                id={this.props.match.params.id}
              />
          },
          {
            path: `/frontend/business/${this.props.match.params.id}/add-subscription`,
            name: "Add Subscription",
            selected: "Add Subscription",
            main: () =>
              <AddSubscription
                id={this.props.match.params.id}
                NMILink={`/frontend/business/${this.props.match.params.id}/NMIsetup-1`}
              />
          },
          {
            path: `/frontend/business/${this.props.match.params.id}/add-benefit`,
            name: "Add Benefit",
            selected: "Add Benefit",
            main: () =>
              <AddBenefit
                id={this.props.match.params.id}
                NMILink={`/frontend/business/${this.props.match.params.id}/NMIsetup-1`}
              />
          },
          {
            path: `/frontend/business/${this.props.match.params.id}/customer/${this.props.match.params.cid}`,
            exact: true,
            name: "",
            selected: "Add Customer",
            main: () =>
              <EditCustomer
                id={this.props.match.params.id}
                cid={this.props.match.params.cid}
                NMILink={`/frontend/business/${this.props.match.params.id}/customer/${this.props.match.params.cid}/NMIsetup-1`}
                EnlistSubscriptionsLink={`/frontend/business/${this.props.match.params.id}/customer/${this.props.match.params.cid}/EnlistSubscriptions`}
                logout={this.logout}
              />
          },
          {
            path: `/frontend/business/${this.props.match.params.id}/customer/${this.props.match.params.cid}/EnlistSubscriptions`,
            exact: true,
            name: "",
            selected: "Add Customer",
            main: () =>
              <EnlistSubscriptions
                id={this.props.match.params.id}
                cid={this.props.match.params.cid}
                logout={this.logout}
              />
          },
          {
            path: `/frontend/business/${this.props.match.params.id}/subscription/${this.props.match.params.sid}`,
            exact: true,
            name: "",
            selected: "Add Subscription",
            main: () =>
              <EditSubscription
                id={this.props.match.params.id}
                NMILink={`/frontend/business/${this.props.match.params.id}/subscription/${this.props.match.params.bid}/NMIsetup-1`}
                sid={this.props.match.params.sid}
                logout={this.logout}
              />
          },
          {
            path: `/frontend/business/${this.props.match.params.id}/benefit/${this.props.match.params.beid}`,
            exact: true,
            name: "",
            selected: "Add Benefit",
            main: () =>
              <EditBenefit
                id={this.props.match.params.id}
                NMILink={`/frontend/admin/${this.props.match.params.id}/business/${this.props.match.params.bid}/NMIsetup-1`}
                beid={this.props.match.params.beid}
                logout={this.logout}
              />
          },
          // {
          //   path: `/frontend/admin/${this.props.match.params.id}/add-business`,
          //   name: "Add Business",
          //   selected: "Add Business",
          //   main: () =>
          //     <AddBusiness
          //       NMILink={`/frontend/admin/${this.props.match.params.id}/NMIsetup-1`}
          //     />
          // },
          {
            path: `/frontend/business/${this.props.match.params.id}/customer/${this.props.match.params.cid}/NMIsetup-1`,
            name: "",
            selected: "Add Customer",
            main: () =>
              <NMISetupStep1
                NMIStep2Link={`/frontend/business/${this.props.match.params.id}/customer/${this.props.match.params.cid}/NMIsetup-2`}
              />
          },
          {
            path: `/frontend/business/${this.props.match.params.id}/customer/${this.props.match.params.cid}/NMIsetup-2`,
            name: "",
            selected: "Add Customer",
            main: () => <NMISetupStep2/>
          },
          // {
          //   path: `/frontend/admin/${this.props.match.params.id}/business/${this.props.match.params.bid}`,
          //   exact: true,
          //   name: "",
          //   selected: "Add Business",
          //   main: () =>
          //     <EditBusiness
          //       NMILink={`/frontend/admin/${this.props.match.params.id}/business/${this.props.match.params.bid}/NMIsetup-1`}
          //     />
          // }
        ];
      // }
      return (
          <Portal
            routes={routes}
            username="Business"
            //username={this.state.username}
            logout={this.logout}
            isLoading={this.state.isLoading}
          />
      );
    }
  }

export default BusinessPortal;
