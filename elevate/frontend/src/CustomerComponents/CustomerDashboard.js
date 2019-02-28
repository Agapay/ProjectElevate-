import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //delete after
import { withRouter } from "react-router";
import CustomerTableItem from "./CustomerTableItem";


let MockupData = [ //change the mockup data if you want to test how you will render the subscriptions
    {name: "Car Maintenance", status: "OK", id:0, cost: 30.00}
]
//quantity change to cost

class CustomerDashboard extends Component {
    constructor(props) {
      super(props);
      this.state = {
        customerEntries: MockupData,
      }
    }

    // componentDidMount() {
    //     // this._isMounted = true;
    //     document.title = "Elevate - Dashboard";
    //     fetch('/api/users/businesses', {
    //         method: 'GET',
    //         headers: {
    //         Authorization: `JWT ${localStorage.getItem('token')}`
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(json => {
    //             if(json.detail) { //error handling
    //                 // this.setState({
    //                 //     error: true,
    //                 // })
    //                 console.log(json.detail);
    //                 this.props.logout();
    //             } else {
    //                 console.log(json); //list of businesses
    //                 let newBusinesses = json.map((business) => { //format backend json to frontend
    //                   let newBusiness = {};
    //                   newBusiness.name = business.business_name;
    //                   newBusiness.id = business.id;
    //                   newBusiness.status = business.active ? "OK": "BAD"; //if active ok, else bad
    //                   return newBusiness;
    //                 });
    //                 this.setState({
    //                   businessEntries: newBusinesses
    //                 })
    //             }
    //         });
    // }

    render() {
      return (
        <div className="dashboard-container">
        <h1>Subscriptions</h1>
          <table className="col-12" >
            <tbody>
                  <tr>
                    <th className='left_side'>Name</th>
                    <th className="">Status</th>
                    <th className="">View|Edit</th>
                    <th className='right_side centered-middle'>Cost</th>
                  </tr>
                  { this.state.customerEntries.map((customerEntry, index) => {
                      return (
                        <CustomerTableItem
                          name={customerEntry.name}
                          status={customerEntry.status}
                          key={"customerEntry"+index}
                          id={this.props.id}
                          cost={customerEntry.cost}
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
