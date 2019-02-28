import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //delete after
import ListBenefits from './ListBenefits';

const mockupBenefits = [ //id is benefit id
    { name: "Free Carwash", quantity: 0, id:0 },
    { name: "Free Tire Change", quantity: 0, id:1 },
    { name: "Free Oil Change", quantity: 0, id:2 },
]

class AddSubscription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "", //not required
            amount: 0,
            monthly_recurring: true,
            yearly_recurring: false,
            benefits: [],
            isEditing: false,
        }
    }

    componentDidMount() {
        document.title = "Elevate - Add Business";
        this.setState({
            benefits: mockupBenefits,
        });
    }

    addSubscription() {
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

    submitForm = (e) => { // function to call backend and add the benefit
        e.preventDefault();
        console.log(this.state);
        // this.AddSubscription(); -> redirects to edit benefit page
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    toggleCheckbox = (e) => {
        if(this.state.isEditing) {
            this.setState({
                monthly_recurring: !this.state.monthly_recurring,
                yearly_recurring: !this.state.yearly_recurring,
            })
        }
    }

    updateQuantity = (e, index) => {
        const benefits = this.state.benefits;
        benefits[index].quantity = e.target.value;
        this.setState({
            benefits,
        })
    }

    toggleEdit = (e) => {
        this.setState({
            isEditing: !this.state.isEditing,
        })
      }

    render() {
      return (
        <div className="AddSubscription">
          <h1>Add Subscription</h1>
          <form onSubmit={this.submitForm}>
                  <div className="smallboxed">
                      <h4>Subscription Information</h4>
                      <div className="subbox1">
                          <label htmlFor="title">Title</label>
                          <br/>
                          <input type="text" name="title" id="title" value={this.state.title} className="inputs" required onChange={this.onChange} readOnly={!this.state.isEditing}/>
                          <br/>
                          <label htmlFor="amount">Amount</label>
                          <br/>
                          <input type="number" name="amount" id="amount" value={this.state.amount} className="inputs" required onChange={this.onChange} readOnly={!this.state.isEditing}/>
                          <br/>
                      </div>
                      <div className="subbox2">
                          <label htmlFor="description">Description</label>
                          <br/>
                          <input type="text" name="description" id="description" value={this.state.description} className="inputs" onChange={this.onChange} readOnly={!this.state.isEditing}/>
                          <br/>
                      </div>
                      <h4>Recurring Payment Type</h4>
                      <div className="subbox1">
                        <input type="checkbox" name="monthly_recurring" id="monthly_recurring" checked={this.state.monthly_recurring} className="inputs" onClick={this.toggleCheckbox} readOnly={!this.state.isEditing}/>
                        <label htmlFor="monthly_recurring">Monthly Recurring</label>
                        <br/>
                        <input type="checkbox" name="yearly_recurring" id="yearly_recurring" checked={this.state.yearly_recurring} className="inputs" onClick={this.toggleCheckbox} readOnly={!this.state.isEditing}/>
                        <label htmlFor="yearly_recurring">Yearly Recurring</label>
                        <br/>
                      </div>
                      <h4>Benefits</h4>
                      <ListBenefits benefits={this.state.benefits} updateQuantity={this.updateQuantity} editPage={true} isEditing={this.state.isEditing} />
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


export default AddSubscription;