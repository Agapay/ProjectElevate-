import React, { Component } from 'react';

class Test extends Component {
    constructor(props) {
      super(props);
      this.state = {
        business_name: "",
        username: "",
        first_name: "",
        last_name: ""
      }
    }

    componentDidMount = () => {
      fetch('/business').then((resp) => resp.json()).then(
        (data) => {
          console.log(data);
          let businessTestData = data.results[0];
          this.setState({
            business_name: businessTestData.business_name,
            username: businessTestData.username,
            first_name: businessTestData.first_name,
            last_name: businessTestData.last_name,
          });
        }
      )}

    render() {
      // console.log(request.session);
      return (
        <div className="Test">
          <h1>Test for 1 business</h1>
          <div>business_name: {this.state.business_name}</div>
          <div>username: {this.state.username}</div>
          <div>first_name: {this.state.first_name}</div>
          <div>last_name: {this.state.last_name}</div>
        </div>
      );
    }
  }

export default Test;