import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //delete after

class EditBusiness extends Component {
    componentDidMount() {
        document.title = "Elevate - View/Edit Business";
    }

    render() {
      console.log("lll")
      return (
        <div className="EditBusiness">
          <h1>Edit Business</h1>
                <div className="smallboxed">
                    <h4>Business Information</h4>
                    <div className="subbox1">
                        <label htmlFor="business_name">Business Name</label>
                        <br/>
                        <input type="text" name="business_name" className="inputs"/>
                        <br/>
                        <label htmlFor="api_key">Business API Key</label>
                        <br/>
                        <input type="text" name="api_key" className="inputs" />
                        <br/>
                    </div>
                    <div className="subbox2">
                        <label htmlFor="username">Username</label>
                        <br/>
                        <input type="text" name="username" className="inputs" />
                        <br/>
                        <label htmlFor="Password">Password</label>
                        <br/>
                        <input type="text" name="Password " className="inputs" />
                        <br/>
                    </div>
                </div>
                <div className="smallboxed">
                        <h4>Business Owner InhtmlFormation</h4>
                        <div className="subbox1">
                            <label htmlFor="first_name">First_name</label>
                            <br/>
                            <input type="text" name="first_name" className=" inputs"/>
                            <br/>
                            <label htmlFor="Last_name">Last_name</label>
                            <br/>
                            <input type="text" name="Last_name" className="inputs"/>
                            <br/>
                        </div>
                        <div className="subbox2">
                            <label htmlFor="Email">Email</label>
                            <br/>
                            <input type="text" name="Email" className="inputs"/>
                            <br/>
                            <label htmlFor="Phone_Number">Phone Number</label>
                            <br/>
                            <input type="text" name="Phone_Number" className="inputs" />
                            <br/>
                        </div>
                    </div>
                  <div className="smallboxed">
                      <h4>Primary Address</h4>
                      <div className="subbox1">
                          <label htmlFor="Street_Address">Street Address</label>
                          <br/>
                          <input type="text" name="Street_Address" className="inputs"/>
                          <br/>
                          <label htmlFor="City">City</label>
                          <br/>
                          <input type="text" name="City" className="inputs" />
                          <br/>
                      </div>
                      <div className="subbox2">
                          <label htmlFor="Suite/API#">Suite/API#</label>
                          <br/>
                          <input type="text" name="Suite/API#" className="inputs"/>
                          <br/>
                          <div id="smaller_input">
                              <label htmlFor="State" >State</label>
                              <br/>
                              <input type="text" name="State" style={{width: '130px'}} />
                              <br/>
                          </div>
                          <div id="smaller_input">
                              <label htmlFor="Postal_Code" id="smaller_input">Postal Code</label>
                              <br/>
                              <input type="text" name="Postal_Code" style={{width: '260px'}}  />
                              <br/>
                          </div>
                      </div>
                    <br/>
                    <button className="green_button">Save</button>
                    <Link id="setup" to={this.props.NMILink}>Setup NMI</Link>
                    <br/>
                    <br/>
                </div>
        </div>
      );
    }
  }
  {/* <Link to={this.props.NMILink}>NMI Setup</Link> */}


export default EditBusiness;