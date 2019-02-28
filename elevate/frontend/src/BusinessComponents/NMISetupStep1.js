import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //delete after

class NMISetupStep1 extends Component {
    constructor(props) {
      super(props);
      this.state = {
        company_name: "",
        first_name: "",
        last_name: "",
        customer_vault_id: "",
        address_1: "",
        address_2: "",
        city: "",
        state_province: "",
        zip_code: "",
        county: "",
        phone_number: "",
        fax_number: "",
        email: ""
      }
    }

    componentDidMount() {
        document.title = "Elevate - NMI Setup Step 1";
    }

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
        //redirect to step 2

    }

    render() {
      return (
        <div className="NMISetupStep1">
          <h1>NMI Setup</h1>
                <div className="smallboxed">
                    <h4>STEP ONE</h4>
                    <form onSubmit={this.submitForm}>
                    <div className="subbox1">
                        <label htmlFor="company_name">Company Name</label>
                        <br/>
                        <input type="text" name="company_name" id="company_name" className="inputs" onChange={this.onChange} required/>
                        <br/>
                        <label htmlFor="first_name">First name</label>
                        <br/>
                        <input type="text" name="first_name" id="first_name" className="inputs" onChange={this.onChange} required/>
                        <br/>
                        <label htmlFor="address_1">Address 1</label>
                        <br/>
                        <input type="text" name="address_1" id="address_1" className="inputs" onChange={this.onChange} required/>
                        <br/>
                        <label htmlFor="city">City</label>
                        <br/>
                        <input type="text" name="city" id="city" className="inputs" onChange={this.onChange} required/>
                        <br/>
                        <label htmlFor="zip_code">Zip Code</label>
                        <br/>
                        <input type="text" name="zip_code" id="zip_code"  className="inputs" onChange={this.onChange} required/>
                        <br/>
                        <label htmlFor="phone_number">Phone Number</label>
                        <br/>
                        <input type="text" name="phone_number" id="phone_number"  className="inputs" onChange={this.onChange} required/>
                        <br/>
                        <label htmlFor="email">Email</label>
                        <br/>
                        <input type="text" name="email" id="email"  className="inputs" onChange={this.onChange} required/>
                        <br/>
                        <button className="green_button">Submit Step-one</button>
                        {/* <Link to={this.props.NMIStep2Link} classNameName="normal_button green_button">Continue to NMI Step 2</Link> */}
                    </div>
                    <div className="subbox2">
                        <label htmlFor="customer_vault_id">Customer Vault ID</label>
                        <br/>
                        <input type="text" name="customer_vault_id" id="customer_vault_id"  className="inputs" onChange={this.onChange} required/>
                        <br/>
                        <label htmlFor="last_name">Last Name</label>
                        <br/>
                        <input type="text" name="last_name" id="last_name"  className="inputs" onChange={this.onChange} required/>
                        <br/>
                        <label htmlFor="address_2">Address 2</label>
                        <br/>
                        <input type="text" name="address_2" id="address_2"   className="inputs" onChange={this.onChange} required/>
                        <br/>
                        <label htmlFor="state_province">State/Province</label>
                        <br/>
                        <input type="text" name="state_province" id="state_province"  className="inputs" onChange={this.onChange} required/>
                        <br/>
                        <label htmlFor="county">County</label>
                        <br/>
                        <input type="text" name="county" id="county"   className="inputs" onChange={this.onChange} required/>
                        <br/>
                        <label htmlFor="fax_number">Fax Number</label>
                        <br/>
                        <input type="text" name="fax_number" id="fax_number"  className="inputs" onChange={this.onChange} required/>
                        <br/>
                    <div/>
              </div>
            </form>

          {/* <h1>NMI</h1>
          <h2>Step 1</h2>
          <Link to={this.props.NMIStep2Link}>Continue to NMI Step 2</Link> */}
        </div>
        </div>
      );
    }
  }

export default NMISetupStep1;
