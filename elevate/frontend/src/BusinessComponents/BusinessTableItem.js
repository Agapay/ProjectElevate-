import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //delete after
import { withRouter } from "react-router";

class BusinessTableItem extends Component {
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
          <a href={`/frontend/business/${this.props.id}/customer/${this.props.cid}`}>
                Edit
              </a>
          </td>
          <td className='right_side'>
            <span className="blue-link">Go</span>
        </td>
      </tr>
    );
  }
}

export default withRouter(BusinessTableItem);