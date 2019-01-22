import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //delete after

class AddBusiness extends Component {
    constructor(props) {
        super(props);
        this.state = {
            business_name: "",
            api_key: "",
            username: "",
        }
    }

    componentDidMount() {
        document.title = "Elevate - Add Business";
    }

    submitForm = (e) => {
        e.preventDefault();
    }

    onChange = (e) => {
        // console.log(e.target.name);
        // console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    render() {
      return (
        <div className="AddBusiness">
          <h1>Add Business</h1>
          <form onSubmit={this.submitForm}>
                <div className="smallboxed">
                    <h4>Business Information</h4>
                    <div className="subbox1">
                        <label htmlFor="business_name">Business Name</label>
                        <br/>
                        <input type="text" name="business_name" value={this.state.business_name} className="inputs" required onChange={this.onChange}/>
                        <br/>
                        <label htmlFor="api_key">Business API Key</label>
                        <br/>
                        <input type="text" name="api_key" value={this.state.api_key} className="inputs"/>
                        <br/>
                    </div>
                    <div className="subbox2">
                        <label htmlFor="username">Username</label>
                        <br/>
                        <input type="text" name="username" value={this.state.username} className="inputs"/>
                        <br/>
                        <label htmlFor="password">Password</label>
                        <br/>
                        <input type="text" name="password"  value={this.state.password} className="inputs"/>
                        <br/>
                    </div>
                </div>
                <div className="smallboxed">
                        <h4>Business Owner Information</h4>
                        <div className="subbox1">
                            <label htmlFor="first_name">First_name</label>
                            <br/>
                            <input type="text" name="first_name" value={this.state.value} className=" inputs"/>
                            <br/>
                            <label htmlFor="last_name">Last_name</label>
                            <br/>
                            <input type="text" name="last_name" value={this.state.last_name} className="inputs"/>
                            <br/>
                        </div>
                        <div className="subbox2">
                            <label htmlFor="email">Email</label>
                            <br/>
                            <input type="text" name="email" value={this.state.email} className="inputs"/>
                            <br/>
                            <label htmlFor="phone_number">Phone Number</label>
                            <br/>
                            <input type="text" name="phone_number" value={this.state.phone_number} className="inputs"/>
                            <br/>
                        </div>
                    </div>
                  <div className="smallboxed">
                      <h4>Primary Address</h4>
                      <div className="subbox1">
                          <label htmlFor="street_address">Street Address</label>
                          <br/>
                          <input type="text" name="street_address" value={this.state.street_address} className="inputs"/>
                          <br/>
                          <label htmlFor="city">c</label>
                          <br/>
                          <input type="text" name="city" value={this.state.city} className="inputs"/>
                          <br/>
                      </div>
                      <div className="subbox2">
                          <label htmlFor="suite_apt">Suite/Apt#</label>
                          <br/>
                          <input type="text" name="suite_apt" value={this.state.suite_apt} className="inputs"/>
                          <br/>
                          <div id="smaller_input">
                              <label htmlFor="state" >State</label>
                              <br/>
                              <input type="text" name="state" value={this.state.state} style={{width: '130px'}}/>
                              <br/>
                          </div>
                          <div id="smaller_input">
                              <label htmlFor="postal_code" id="smaller_input">Postal Code</label>
                              <br/>
                              <input type="text" name="postal_code" value={this.state.postal_code} style={{width: '260px'}}/>
                              <br/>
                          </div>
                      </div>
                    <br/>
                    <button className="green_button">Save</button>
                    <Link id="setup" to={this.props.NMILink}>Setup NMI</Link>
                    <br/>
                    <br/>
                </div>
            </form>
        </div>
      );
    }
  }
  {/* <Link to={this.props.NMILink}>NMI Setup</Link> */}


export default AddBusiness;