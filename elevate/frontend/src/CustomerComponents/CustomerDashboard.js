import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //delete after
import { withRouter } from "react-router";
import CustomerTableItem from "./CustomerTableItem";


let MockupData = [ //change the mockup data if you want to test how you will render the subscriptions
    {name: "Oil Change", status: "OK", id:0},
    {name: "Tire Rotation", status: "OK", id:1},
    {name: "Alignment", status: "OK", id:2},
    {name: "Coolent Replacement", status: "BAD", id:3},
    {name: "Windshield Replacement", status: "OK", id:4},
    {name: "Blinker Fluid", status: "BAD", id:5},
    {name: "Dent Fix", status: "BAD", id:6},
]

class CustomerDashboard extends Component {
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
          <table className="col-12" >
            <tbody>
                  <tr>
                    <th className='left_side'>Name</th>
                    <th className="">Status</th>
                    <th className="">View</th>
                    <th className='right_side centered-middle'>Suspend</th>
                  </tr>
                  { this.state.businessEntries.map((businessEntry, index) => {
                      return (
                        <CustomerTableItem
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

export default withRouter(CustomerDashboard);
