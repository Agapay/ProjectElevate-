import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //delete after
import axios from 'axios';

class EditBenefit extends Component {
    constructor(props) {
        super(props);
        this.state = {
          title: "",
          description: "", //not required
          isEditing: false,
        }
    }

    componentDidMount() {
        document.title = "Elevate - Edit Benefit";
        this.getBenefit();
    }

    getBenefit = () => {
      axios({
        method: 'GET',
        url: `/api/users/benefit/${this.props.beid}`, //Update when we have it
        headers: {
          'Authorization': `JWT ${localStorage.getItem('token')}`
        },
        })
        .then((response) => {
          console.log(response);
          const benefitInfo = response.data;     
          if (benefitInfo.business !== parseInt(this.props.id)) {
            this.props.logout();
          } else {
            this.setState({
              title: benefitInfo.title,
              description: benefitInfo.description,
            });
          }
        })
        .catch((error) => {
          console.log(error)
        });
    }

    editBenefit = () => {
      axios({
        method: 'PATCH',
        url: `/api/users/benefit/${this.props.beid}`, //Update when we have it
        headers: {
            'Authorization': `JWT ${localStorage.getItem('token')}`
            },
        data: {
            title: this.state.title,
            description: this.state.description,
          }
        })
        .then((response) => {
            console.log(response);
            this.toggleEdit();
            // window.location.replace(`/frontend/admin/${this.props.id}/business/${newBusiness.id}`);
        })
        .catch((error) => {
            console.log(error);    
            console.log(error.response);  
            // if(error.response.status === 400) { // 400 is a bad request
            //     if(error.response.data.email) {
            //         // alert(error.response.data.email);
            //         this.setState({
            //             emailError: true,
            //             emailErrorMessage: error.response.data.email,
            //         })
            //     }
            // }         
        })
    }

    submitForm = (e) => { // function to call backend and add the benefit
        e.preventDefault();
        console.log(this.state);
        this.editBenefit();
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    toggleEdit = (e) => {
      this.setState({
          isEditing: !this.state.isEditing,
      })
    }

    render() {
      return (
        <div className="EditBenefit">
          <h1>Add Benefit</h1>
          <form onSubmit={this.submitForm}>
                  <div className="smallboxed">
                      <h4>Benefit Information</h4>
                      <div className="subbox1">
                          <label htmlFor="title">Title</label>
                          <br/>
                          <input type="text" name="title" id="title" value={this.state.title} className="inputs" required onChange={this.onChange} readOnly={!this.state.isEditing}/>
                          <br/>
                          <label htmlFor="description">Description</label>
                          <br/>
                          <textarea type="text" name="description" id="description" value={this.state.description} className="inputs" onChange={this.onChange} readOnly={!this.state.isEditing}/>
                          <br/>
                      </div>
                      <div className="subbox2">
                          
                      </div>
                    <br/>
                    {this.state.isEditing ?
                        <span>
                            <button type="submit" className="green_button">Save</button>
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
                            <br/>
                            <br/>
                </span>}
        </div>
      );
    }
  }


export default EditBenefit;