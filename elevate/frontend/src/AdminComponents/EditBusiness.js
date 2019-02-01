import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //delete after

const mockupData = {
	business_name: "Amazon",
	api_key: "$839432904i3290fjisV)(EV(#)@_)vdm",
	username: "JeffB",
	password: "049240243234",
	first_name: "Jeff",
	last_name: "Bezos",
	email: "j@b.com",
	phone_number: "9999999999",
	street_address: "Address of Street",
	suite_apt: "",
	city: "City of The Place",
	state: "CA",
	postal_code: "99999",
}

class EditBusiness extends Component {
    constructor(props) {
        super(props);
        this.state = {
            business_name: "",
            api_key: "",
            username: "",
            password: "",
            first_name: "",
            last_name: "",
            email: "",
            phone_number: "",
            street_address: "",
            suite_apt: "",
            city: "",
            state: "",
            postal_code: "",
            isEditing: false,
        }
    }

    componentDidMount() {
        document.title = "Elevate - Edit Business";
        //actual axios function to load data of user
        this.setState({
            ...mockupData
        });
    }

    submitForm = (e) => { // function to call backend and add the business
        // alert(e);
        e.preventDefault();
        console.log(this.state);
        // TODO axios() the call to backend
        // if successfully submited form
            this.toggleEdit(e);
    }

    toggleEdit = (e) => {
        this.setState({
            isEditing: !this.state.isEditing
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    render() {
      return (
        <div className="EditBusiness">
          <h1>Edit Business</h1>
          <form onSubmit={this.submitForm}>
                <div className="smallboxed">
                    <h4>Business Information</h4>
                    <div className="subbox1">
                        <label htmlFor="business_name">Business Name</label>
                        <br/>
                        <input type="text" name="business_name" id="business_name" value={this.state.business_name} className="inputs" required onChange={this.onChange} readOnly={!this.state.isEditing}/>
                        <br/>
                        <label htmlFor="api_key">Business API Key</label>
                        <br/>
                        <input type="text" name="api_key" id="api_key" value={this.state.api_key} className="inputs" onChange={this.onChange} readOnly={!this.state.isEditing}/>
                        <br/>
                    </div>
                    <div className="subbox2">
                        <label htmlFor="username">Username</label>
                        <br/>
                        <input type="text" name="username" id="username" value={this.state.username} className="inputs" required onChange={this.onChange} readOnly={!this.state.isEditing}/>
                        <br/>
                        <label htmlFor="password">Password</label>
                        <br/>
                        <input type="password" name="password" id="password"  value={this.state.password} className="inputs" required onChange={this.onChange} readOnly={!this.state.isEditing}/>
                        <br/>
                    </div>
                </div>
                <div className="smallboxed">
                        <h4>Business Owner Information</h4>
                        <div className="subbox1">
                            <label htmlFor="first_name">First Name</label>
                            <br/>
                            <input type="text" name="first_name" id="first_name" value={this.state.first_name} className=" inputs" required onChange={this.onChange} readOnly={!this.state.isEditing}/>
                            <br/>
                            <label htmlFor="last_name">Last Name</label>
                            <br/>
                            <input type="text" name="last_name" id="last_name" value={this.state.last_name} className="inputs" required onChange={this.onChange} readOnly={!this.state.isEditing}/>
                            <br/>
                        </div>
                        <div className="subbox2">
                            <label htmlFor="email">Email</label>
                            <br/>
                            <input type="email" name="email" id="email" value={this.state.email} className="inputs" required onChange={this.onChange} readOnly={!this.state.isEditing}/>
                            <br/>
                            <label htmlFor="phone_number">Phone Number</label>
                            <br/>
                            <input type="number" name="phone_number" id="phone_number" value={this.state.phone_number} className="inputs" required onChange={this.onChange} readOnly={!this.state.isEditing}/>
                            <br/>
                        </div>
                    </div>
                  <div className="smallboxed">
                      <h4>Primary Address</h4>
                      <div className="subbox1">
                          <label htmlFor="street_address">Street Address</label>
                          <br/>
                          <input type="text" name="street_address" id="street_address" value={this.state.street_address} className="inputs" required onChange={this.onChange} readOnly={!this.state.isEditing}/>
                          <br/>
                          <label htmlFor="city">City</label>
                          <br/>
                          <input type="text" name="city" id="city" value={this.state.city} className="inputs" required onChange={this.onChange} readOnly={!this.state.isEditing}/>
                          <br/>
                      </div>
                      <div className="subbox2">
                          <label htmlFor="suite_apt">Suite/Apt#</label>
                          <br/>
                          <input type="number" name="suite_apt" id="suite_apt" value={this.state.suite_apt} className="inputs"  onChange={this.onChange} readOnly={!this.state.isEditing}/>
                          <br/>
                          <div id="smaller_input">
                              <label htmlFor="state" >State</label>
                              <br/>
                              <input type="text" name="state" id="state" value={this.state.state} style={{width: '130px'}} required onChange={this.onChange} readOnly={!this.state.isEditing}/>
                              <br/>
                          </div>
                          <div id="smaller_input">
                              <label htmlFor="postal_code" id="smaller_input">Postal Code</label>
                              <br/>
                              <input type="number" name="postal_code" id="postal_code" value={this.state.postal_code} style={{width: '260px'}} required onChange={this.onChange} readOnly={!this.state.isEditing}/>
                              <br/>
                          </div>
                      </div>
                    <br/>
                    {this.state.isEditing ?
                        <span>
                            <button type="submit" className="green_button">Save</button>
                            <Link id="setup" to={this.props.NMILink}>Setup NMI</Link>
                            <br/>
                            <br/>
                        </span>
                        
                        : null}
                    
                </div>
            </form>
            {this.state.isEditing ?
                null :
                <span>
                <button type="button" onClick={this.toggleEdit} className="green_button">Edit</button>
                <Link id="setup" to={this.props.NMILink}>Setup NMI</Link>
                            <br/>
                            <br/>
                </span>}
        </div>
      );
    }
  }


export default EditBusiness;