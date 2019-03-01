import React, { Component } from 'react';
import BusinessBenefitTableItem from './BusinessBenefitTableItem';
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

class BusinessBenefits extends Component {
    constructor(props) {
      super(props);
      this.state = {
        benefitsEntries: [],
      }
    }

    componentDidMount() {
        document.title = "Elevate - Dashboard";
        // this.setState({
        //   businessEntries: MockupData
        // })
        console.log(this.state.benefitsEntries);
        console.log(this.props.id);
        console.log(`/api/users/businesses/${this.props.id}/benefits`);
        fetch(`/api/users/businesses/${this.props.id}/benefits`, {
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
                  let newBenefits = json.benefits.map((benefit) => { //format backend json to frontend
                    let newBenefit = {};
                    newBenefit.name = benefit.title;
                    newBenefit.id = benefit.id;
                    newBenefit.status = true ? "OK": "BAD"; //if active ok, else bad
                    return newBenefit;
                  });
                  this.setState({
                    benefitsEntries: newBenefits,
                  })
              }
          });
    }

    render() {
      return (
        <div className="dashboard-container">
          <h1>Benefits</h1>
            <table className="col-12" >
              <tbody>
                    <tr>
                      <th className='left_side'>Name</th>
                      <th className="">Status</th>
                      <th className="">View</th>
                      <th className='right_side'>Business Mode</th>
                    </tr>
                    { this.state.benefitsEntries.map((benefit, index) => {
                        return (
                          <BusinessBenefitTableItem
                            name={benefit.name}
                            status={benefit.status}
                            key={"benefit"+index}
                            id={this.props.id}
                            beid={benefit.id} //benefit entry
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

export default withRouter(BusinessBenefits);
