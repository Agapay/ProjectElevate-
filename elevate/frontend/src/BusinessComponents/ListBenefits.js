import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //delete after

class ListBenefits extends Component { 
  constructor(props) {
    super(props);
  }

  render() {
    const benefitsList = this.props.benefits.map((benefit, index) => {
      return (
        <div key={"benefitsListItem" + index} class="benefit-item">
          <label htmlFor={"benefitID" + index}>{benefit.name}</label>
          <input type="number" id={"benefitID" + index} value={benefit.quantity} onChange={(e) => {this.props.updateQuantity(e, index)}} readOnly={this.props.editPage && !this.props.isEditing} />
        </div>
      );  
    })

    return (
      <div className="list-container">
        <div key={"benefitsListItemInformation"} class="benefit-title">
          <span>Name</span>
          <span className="benefit-quantity">Quantity</span>
        </div>
        { this.props.benefits.length !== 0 ? benefitsList : <span>None</span>}
      </div>
    )
  }
}

export default ListBenefits;