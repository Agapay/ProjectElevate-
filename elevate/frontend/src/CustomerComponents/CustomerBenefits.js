import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //delete after

let MockupData = [ //change the mockup data if you want to test how you will render the subscriptions
    {name: "Oil Change", status: "OK", id:0, quantity: 12},
    {name: "Tire Rotation", status: "OK", id:1, quantity: 1},
    {name: "Alignment", status: "OK", id:2, quantity: 0},
    {name: "Coolent Replacement", status: "BAD", id:3, quantity: 4},
    {name: "Windshield Replacement", status: "OK", id:4, quantity: 6},
    {name: "Blinker Fluid", status: "BAD", id:5, quantity: 1},
    {name: "Dent Fix", status: "BAD", id:6, quantity: 12},
]

class CustomerBenefits extends Component {
  constructor(props) {
    super(props)
    this.state = {
      benefits: MockupData,
    } //empty [] when conencting to endpoints
  }

  // TO get customer
  // this.props.id
  // To get subscriptions id
  // this.props.sid
  //  `customer/${this.props.id}/subscription/${this.props.sid}`

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
    // return(
    //   <div>Benefits</div>
    const benefitsList = this.state.benefits.map((benefit, index) => {
      return (
        <div key={"benefitsListItem" + index} class="benefit-item">
          <label htmlFor={"benefitID" + index}>{benefit.name}</label>
          <label id="view_quantity">{benefit.quantity}</label>
        </div>
      );
    })
    // return (
    //   <div>Benefits</div>
    // NEEDS STYLING AND CHANGE INPUT TAGS)
      return (
        <div>
        <h1>Benefits</h1>
          <div className="list-container">
            <div key="benefitsListItemInformation" class="benefit-title">
              <span>Name</span>
              <span className="benefit-quantity">Quantity</span>
            </div>
            { this.state.benefits.length !== 0 ? benefitsList : <span>None</span>}
          </div>
        </div>
    )
  }
}

export default CustomerBenefits;
