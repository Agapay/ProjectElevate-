import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //delete after

class ListSubscriptions extends Component { 
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.editPage);
    console.log(this.props.isEditing);
    const subscriptionsList = this.props.subscriptions.map((subscription, index) => {
      return (
        <div key={"subscriptionsListItem" + index} class="benefit-item">
          <label htmlFor={"subscriptionID" + index}>{subscription.name}</label>
          <input type="checkbox" id={"subscriptionID" + index} checked={subscription.selected} onChange={(e) => {this.props.updateSelected(e, index)}} readOnly={this.props.editPage && !this.props.isEditing} />
        </div>
      );  
    })

    return (
      <div className="list-container">
        <div key={"benefitsListItemInformation"} class="benefit-title">
          <span>Name</span>
          <span className="benefit-quantity">Selected</span>
        </div>
        { this.props.subscriptions.length !== 0 ? subscriptionsList : <span>None</span>}
      </div>
    )
  }
}

export default ListSubscriptions;