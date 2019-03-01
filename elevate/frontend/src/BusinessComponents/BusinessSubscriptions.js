import React, { Component } from 'react';
import BusinessSubscriptionItem from './BusinessSubscriptionItem';
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

class BusinessSubcriptions extends Component {
    constructor(props) {
      super(props);
      this.state = {
        subsEntries: [],
      }
    }

    componentDidMount() {
        document.title = "Elevate - Dashboard";
        // this.setState({
        //   businessEntries: MockupData
        // })
        console.log(this.state.subsEntries);

        console.log(this.props.id);
        //console.log(`/api/users/businesses/${this.props.id}/subscriptions`);
        fetch(`/api/users/businesses/${this.props.id}/subscriptions`, {
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
                  let newSubs = json.subscriptions.map((sub) => { //format backend json to frontend
                    let newSub = {};
                    newSub.title = sub.title;
                    newSub.id = sub.id;
                    newSub.status = true ? "OK": "BAD"; //if active ok, else bad
                    newSub.amount = sub.amount;
                    return newSub;
                  });
                  this.setState({
                    subsEntries: newSubs,
                  })
              }
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
                      <th className="">View|Edit</th>
                      <th className='right_side'>Cost</th>
                    </tr>
                    { this.state.subsEntries.map((subs, index) => {
                        return (
                          <BusinessSubscriptionItem
                            name={subs.title}
                            status={subs.status}
                            key={"subs"+index}
                            id={this.props.id}
                            sid={subs.id} //subscription entry
                            amount={subs.amount}
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

export default withRouter(BusinessSubcriptions);
