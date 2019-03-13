import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //delete after

class ListSubscriptions extends Component { 
  constructor(props) {
    super(props);
  }

  totalAmount() {
    let totalAmount = 0;
    for (const subscription of this.props.subscriptions) {
      if (subscription.selected) {
        totalAmount += subscription.amount;
      }
    }
    return totalAmount;
  }

  render() {
    const subscriptionsList = this.props.subscriptions.map((subscription, index) => {
      return (
        <div key={"subscriptionsListItem" + index} class="benefit-item">
          <label htmlFor={"subscriptionID" + index}>{subscription.name}</label>
          <input type="checkbox" id={"subscriptionID" + index} checked={subscription.selected} onChange={(e) => {this.props.updateSelected(e, index)}} readOnly={this.props.editPage && !this.props.isEditing} />
          <span className="benefit-amount">{subscription.amount}</span>
        </div>
      );  
    })

    return (
      <div className="list-container">
        <div key={"benefitsListItemInformation"} className="benefit-title">
          <span>Name</span>
          <span className="benefit-quantity">Selected</span>
          <span className="benefit-amount">Amount</span>
        </div>
        { this.props.subscriptions.length !== 0 ? subscriptionsList : <span>None</span>}
        <div key={"benefitsTotalAmountInformation"} className="benefit-title">
          <div className="benefit-total-amount">Total Amount</div>
        </div>
        <div className="benefit-total-amount benefit-total-amount-number">
          {this.totalAmount()}
        </div>
      </div>
    )
  }
}

export default ListSubscriptions;