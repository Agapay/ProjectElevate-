import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //delete after

class AddBenefit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "", //not required
        }
    }

    componentDidMount() {
        document.title = "Elevate - Add Benefit";
    }

    addBenefit() {
      axios({
        method: 'POST',
        url: '/api/users/', //Update when we have it
        headers: {
            'Authorization': `JWT ${localStorage.getItem('token')}`
            },
        data: {
            business_id: this.props.id, //props id is user id check if it is the same thing
            title: this.state.title,
            description: this.state.description,
        }
        })
        .then((response) => {
            console.log(response);
            let newBusiness = response.data;
            window.location.replace(`/frontend/admin/${this.props.id}/business/${newBusiness.id}`);
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

    submitForm = (e) => { // function to call backend and add the benefit
        e.preventDefault();
        console.log(this.state);
        // this.addBenefit(); -> redirects to edit benefit page
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    render() {
      return (
        <div className="AddBenefit">
          <h1>Add Benefit</h1>
          <form onSubmit={this.submitForm}>
                  <div className="smallboxed">
                      <h4>Benefit Information</h4>
                      <div className="subbox1">
                          <label htmlFor="title">Title</label>
                          <br/>
                          <input type="text" name="title" id="title" value={this.state.title} className="inputs" required onChange={this.onChange}/>
                          <br/>
                      </div>
                      <div className="subbox2">
                          <label htmlFor="description">Description</label>
                          <br/>
                          <input type="text" name="description" id="description" value={this.state.description} className="inputs" onChange={this.onChange}/>
                          <br/>
                      </div>
                    <br/>
                    <button className="green_button">Save</button>
                    {/* <Link id="setup" to={this.props.NMILink}>Setup NMI</Link> */}
                    <br/>
                    <br/>
                </div>
            </form>
        </div>
      );
    }
  }


export default AddBenefit;