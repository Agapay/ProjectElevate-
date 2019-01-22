import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //delete after
import Portal from "./Portal.js";
import AdminDashboard from "./AdminDashboard";
import AddBusiness from "./AddBusiness";
import EditBusiness from "./EditBusiness";
import NMISetupStep1 from "./NMISetupStep1";
import NMISetupStep2 from "./NMISetupStep2";


class AdminPortal extends Component {
    constructor(props) {
      super(props);
      this.state = {
        username: "",
        id: null,
        bid: null, // business id
      }
    }

    componentDidMount() {
      //if you not logged in kick out of page or not correct id

        this.setState({ // for now until we connect with backend
          id: this.props.match.params.id,
          bid: this.props.match.params.bid,
          username: "Admin"
        })
        // params.id
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
          // },
          {
            path: `/frontend/admin/${this.props.match.params.id}/dashboard`,
            name: "Dashboard",
            selected: "Dashboard",
            main: () => <AdminDashboard id={this.props.match.params.id}/>
          },
          {
            path: `/frontend/admin/${this.props.match.params.id}/add-business`,
            name: "Add Business",
            selected: "Add Business",
            main: () => 
              <AddBusiness 
                NMILink={`/frontend/admin/${this.props.match.params.id}/NMIsetup-1`}
              />
          },
          {
            path: `/frontend/admin/${this.props.match.params.id}/NMIsetup-1`,
            name: "",
            selected: "Add Business",
            main: () => 
              <NMISetupStep1 
                NMIStep2Link={`/frontend/admin/${this.props.match.params.id}/NMIsetup-2`}
              />
          },
          {
            path: `/frontend/admin/${this.props.match.params.id}/NMIsetup-2`,
            name: "",
            selected: "Add Business",
            main: () => <NMISetupStep2/>
          },
          {
            path: `/frontend/admin/${this.props.match.params.id}/business/${this.props.match.params.bid}`,
            name: "",
            selected: "Add Business",
            main: () => 
              <EditBusiness 
                NMILink={`/frontend/admin/${this.props.match.params.id}/NMIsetup-1`}
              />
          }
        ];
      // }
      return (
          this.state.id !== null ? <Portal routes={routes} username={this.state.username}/> : <div></div>
      );
    }
  }

export default AdminPortal;