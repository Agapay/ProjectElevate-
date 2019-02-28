import React, { Component } from 'react';
import BusinessTableItem from './BusinessTableItem';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //delete after
import { withRouter } from "react-router";


let MockupData = [
    {name: "Amazon", status: "OK", id:0}, //data could contain edit url and enter portal url
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
        customerEntries: [],
      }
    }

    getAllCustomers() {
      fetch(`/api/users/businesses/${this.props.id}/customers`, {
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
                let newCustomers = json.customers.map((customer) => { //format backend json to frontend
                  let newCustomer = {};
                  newCustomer.name = customer.username;
                  newCustomer.id = customer.id;
                  newCustomer.status = customer.active ? "OK": "BAD"; //if active ok, else bad
                  return newCustomer;
                });
                this.setState({
                  customerEntries: newCustomers,
                })
            }
        });
    }

    componentDidMount() {
        document.title = "Elevate - Dashboard";
        this.getAllCustomers();
        // this.setState({
        //   customerEntries: MockupData
        // })
    }

    render() {
      return (
        <div className="dashboard-container">
          <h1>Customers</h1>
            <table className="col-12" >
              <tbody>
                    <tr>
                      <th className='left_side'>Name</th>
                      <th className="">Status</th>
                      <th className="">View</th>
                      <th className='right_side centered-middle'>Suspend</th>
                    </tr>
                    { this.state.customerEntries.map((businessEntry, index) => {
                        return (
                          <BusinessTableItem 
                            name={businessEntry.name}
                            status={businessEntry.status}
                            key={"businessEntry"+index}
                            id={this.props.id}
                            cid={businessEntry.id} //customer entry
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

export default withRouter(BusinessDashboard);
