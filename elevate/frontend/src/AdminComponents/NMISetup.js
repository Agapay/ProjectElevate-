import React, { Component } from 'react';
import axios from 'axios';

class NMISetup extends Component {
    constructor(props) {
      super(props);
      this.state = {
        credit_card_number: "",
        cvv: "",
        exp_date: "",
        amount: 0,
        response: null, //response on createCustomerVault
        business: {},
      }
    }



    getCustomer = () => {
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
              business: businessResponse,
          });
          
      }).catch((error) => {
          console.log(error);
      })
    }

    createCustomerVault = () => {
      const amount = parseInt(this.state.amount); 
    }

    componentDidMount() {
      document.title = "Elevate - NMI Setup";
      this.getCustomer();
    }

    //TODO onChange
    onChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value,
      })
    }

    submitForm = (e) => { // function to call backend and add the business
      e.preventDefault();
      console.log(this.state);
      // TODO axios() the call to backend
      // if successful
        //display a success message then redirect back to edit business
    }

    render() {
      return (
        <div>
          <h1>NMI Setup</h1>
            { this.state.business !== {}
              &&
            <div>
              Creating the customer vault for the business {this.state.business.business_name}
            </div>}
            <br/>
            <form onSubmit={this.submitForm}>
              <div className="subbox1">
                  <label htmlFor="credit_card_number">Credit Card Number</label>
                  <br/>
                  <input placeholder="#### #### #### ####" id="credit_card_number" type="text" name="credit_card_number" className="inputs" value={this.state.credit_card_number} onChange={this.onChange} required/>
                  <br/>
                  <label htmlFor="cvv">CVV</label>
                  <br/>
                  <input placeholder="###" id="cvv" type="text" name="cvv" className="inputs" value={this.state.cvv} onChange={this.onChange} required/>
                  <br/>
                  <button className="green_button">Submit</button>
              </div>
              <div className="subbox2">
                  <label htmlFor="exp_date">Expiration Date</label>
                  <br/>
                  <input placeholder="##/##" id="exp_date" type="text" name="exp_date" className="inputs" value={this.state.exp_date} onChange={this.onChange} required/>
                  <br/>
                  <label htmlFor="amount">Amount</label>
                  <br/>
                  <input id="amount" type="number" name="amount" className="inputs" value={this.state.amount} onChange={this.onChange} required/>
                  <br/>
              </div>
            </form>
            <div>{this.state.response}</div>
            {/* <div className="NMISetupStep2">
          <h1>NMI</h1>
          <h2>Step 2</h2>
        </div> */}
        </div>
      );
    }
  }

export default NMISetup;
