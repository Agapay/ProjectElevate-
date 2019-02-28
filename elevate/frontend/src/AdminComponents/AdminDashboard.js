import React, { Component } from 'react';
import AdminTableItem from './AdminTableItem';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //delete after
import { withRouter } from "react-router";
import axios from 'axios';


let MockupData = [
    {name: "Amazon", status: "OK", id:0}, //data could contain edit url and enter portal url
    {name: "Apple", status: "OK", id:1},
    {name: "Baskin Robins", status: "OK", id:2},
    {name: "Microsoft", status: "BAD", id:3},
    {name: "Clorox", status: "OK", id:4},
    {name: "1234", status: "BAD", id:5},
    {name: "1000004", status: "BAD", id:6},
]


class AdminDashboard extends Component {
    constructor(props) {
      super(props);
      this.state = {
        businessEntries: [],
      }
    }

    componentDidMount() {
        // this._isMounted = true;
        document.title = "Elevate - Dashboard";
        fetch('/api/users/businesses', {
            method: 'GET',
            headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(json => {
                if(json.detail) { //error handling
                    // this.setState({
                    //     error: true,
                    // })
                    console.log(json.detail);
                    this.props.logout();
                } else {
                    console.log(json); //list of businesses
                    let newBusinesses = json.map((business) => { //format backend json to frontend
                      let newBusiness = {};
                      newBusiness.name = business.business_name;
                      newBusiness.id = business.id;
                      newBusiness.status = business.active ? "OK": "BAD"; //if active ok, else bad
                      return newBusiness;
                    });
                    this.setState({
                      businessEntries: newBusinesses
                    })
                }
            });
    }

    componentWillUnmount() {
      // this._isMounted = false;
    }

    render() {
      return (
        <div className="dashboard-container">
          <h1>Businesses</h1>
            <table className="col-12" >
              <tbody>
                    <tr>
                      <th className='left_side'>Name</th>
                      <th className="">Status</th>
                      <th className="">View|Edit</th>
                      <th className='right_side'>Business Mode</th>
                    </tr>
                    { this.state.businessEntries.map((businessEntry, index) => {
                        return (
                          <AdminTableItem
                            name={businessEntry.name}
                            status={businessEntry.status}
                            key={"businessEntry"+index}
                            id={this.props.id}
                            bid={businessEntry.id} //business entry
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

export default withRouter(AdminDashboard);
