import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //delete after
import axios from 'axios';

class EditBusiness extends Component {
    constructor(props) {
        super(props);
        this.state = {
            business_name: "",
            api_key: "",
            username: "",
            password: "********",
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
        
            //Error States
            emailError: false,
            emailErrorMessage: "",
        }
    }

    componentDidMount() {
        document.title = "Elevate - Edit Business";
        //actual axios function to load data of user
        axios({
            method: 'GET',
            url: `/api/users/business/${this.props.bid}`,
            headers: {
                'Authorization': `JWT ${localStorage.getItem('token')}`
                },
        }).then((response) => {
            console.log(response);
            const businessResponse = response.data;
            this.setState({
                business_name: businessResponse.business_name,
                api_key: businessResponse.user_api_key,
                username: businessResponse.username,
                // first_name: businessResponse.first_name,
                // last_name: businessResponse.last_name,
                email: businessResponse.email,
                phone_number: businessResponse.phone_number,
                street_address: businessResponse.street_branch_address,
                suite_apt: businessResponse.apt_branch_address,
                city: businessResponse.city_branch_address,
                state: businessResponse.state_branch_address,
                postal_code: businessResponse.zip_branch_address,
            });
            
        }).catch((error) => {
            console.log(error);
        })
    }

    submitForm = (e) => { // function to call backend and add the business
        e.preventDefault();
        // console.log(this.state);
        // TODO axios() the call to backend
        // TODO redirect to edit business

        console.log()
        axios({
            method: 'PATCH',
            url: `/api/users/business/${this.props.bid}`,
            headers: {
                'Authorization': `JWT ${localStorage.getItem('token')}`
                },
            data: {
                username: this.state.username,
                business_name: this.state.business_name,
                user_api_key: this.state.api_key,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                phone_number: this.state.phone_number,
                street_branch_address: this.state.street_address,
                city_branch_address: this.state.city,
                state_branch_address: this.state.state,
                apt_branch_address: this.state.suite_apt,
                zip_branch_address: this.state.postal_code,
            }
            })
                .then((response) => {
                    console.log(response);
                    let newBusiness = response.data;
                    this.toggleEdit();
                    // window.location.replace(`/frontend/admin/${this.props.id}/business/${newBusiness.id}`);
                })
                .catch((error) => {
                    console.log(error);    
                    console.log(error.response);  
                    if(error.response.status === 400) { // 400 is a bad request
                        if(error.response.data.email) {
                            // alert(error.response.data.email);
                            this.setState({
                                emailError: true,
                                emailErrorMessage: error.response.data.email,
                            })
                        }
                    }
                })
    }

    toggleEdit = (e) => {
        this.setState({
            isEditing: !this.state.isEditing,
            emailError: false,
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    render() {
        console.log(this.state);
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
                        <input type="password" name="password" id="password"  value={this.state.password} className="inputs" required onChange={this.onChange} readOnly/>
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
                            {this.state.emailError && <div className="form-error-message">{this.state.emailErrorMessage}</div>} {/* If there is an email error display it*/}
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