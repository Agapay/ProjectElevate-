import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //delete after
import { withRouter } from "react-router";

class CustomerTableItem extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <tr>
        <td className='left_side'>{this.props.name}</td>
          <td className="">
            <span className={this.props.status === "OK" ? 'circle' : 'circle red'}>
              {this.props.status}
            </span>
          </td>
          <td className="bold">
          <a href={`/frontend/customer/${this.props.id}/subscriptions/${this.props.sid}`}>
                View
              </a>
          </td>
          <td className='right_side centered-middle'>
            <span className="quantity">{this.props.quantity}</span>
        </td>
      </tr>
    );
  }
}

export default withRouter(CustomerTableItem);
