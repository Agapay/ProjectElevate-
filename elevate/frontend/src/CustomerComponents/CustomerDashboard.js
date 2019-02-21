import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //delete after
import { withRouter } from "react-router";
import CustomerTableItem from "./CustomerTableItem";


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
        customerEntries: MockupData,
      }
    }

    componentDidMount() {
        document.title = "Elevate - Dashboard";
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
                    <th className='right_side centered-middle'>Quantity</th>
                  </tr>
                  { this.state.customerEntries.map((customerEntry, index) => {
                      return (
                        <CustomerTableItem
                          name={customerEntry.name}
                          status={customerEntry.status}
                          key={"customerEntry"+index}
                          id={this.props.id}
                          cid={customerEntry.id} //customer entry
                          quantity={customerEntry.quantity}
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
