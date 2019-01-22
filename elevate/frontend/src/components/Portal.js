import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Portal extends Component {
    constructor(props) {
      super(props);
      this.state = {
        dashboardSelected: true,
        addBussinessSelected: false,
      }
    }
  
    render() {

      const sidebarOptions = []; // get tabs to render
      const sidebarPaths = []; // get paths the tabs point to
      for (let i = 0; i < this.props.routes.length; i++) {
        let routeName = this.props.routes[i].name;
        let routePath = this.props.routes[i].path;
        if (routeName !== "") {          
          sidebarOptions.push(routeName);
          sidebarPaths.push(routePath);
        }
      }
      
      // create formatting for the tabs
      for (let i = 0; i < this.props.routes.length; i++) { // for each route
        const jsxSidebar = [];
        let route = this.props.routes[i];
        for (let j = 0; j < sidebarOptions.length; j++) {
          if (sidebarOptions[j] === route.selected) { // for each tab in the sidebar
            jsxSidebar.push(
              <li key={"sidebar" + i + j}> 
                <span className="selected-indicator"></span>
                <Link className="selected" to={sidebarPaths[j]}>{sidebarOptions[j]}</Link>
              </li>
            )
          } else {
            jsxSidebar.push(
              <li key={"sidebar" + i + j}> 
                <Link to={sidebarPaths[j]}>{sidebarOptions[j]}</Link>
              </li>
            )
          }
        }
        jsxSidebar.push(
          <li key={"sidebar-logout"}>
            <a href="/frontend/admin-login" >Logout</a>
          </li>
          );
          
        this.props.routes[i].sidebar = () =>
          <span>
            <h2>{this.props.username}</h2> 
             <ul>
               {jsxSidebar}
             </ul>
          </span>
      }

      return (
        <Router>
          <div className="row portal">
            <div className="col-2 sidebar">
              {this.props.routes.map((route, index) => ( // Renders appropriate sidebar
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.sidebar}
                />
              ))}                
            </div>

            <div className="col-10 right-container">
              {this.props.routes.map((route, index) => ( // Renders main component (right of sidebar)
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.main}
                />
              ))}
            </div>
          </div>
        </Router>
      );
    }
  }

export default Portal;
