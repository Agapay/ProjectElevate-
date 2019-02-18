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
                        <label htmlFor="First_name">First name</label>
                        <br/>
                        <input type="text" name="First_name" className="inputs"/>
                        <br/>
                        <label htmlFor="Address_1">Address 1</label>
                        <br/>
                        <input type="text" name="Address_1" className="inputs" />
                        <br/>
                        <label htmlFor="City">City</label>
                        <br/>
                        <input type="text" name="City" className="inputs"/>
                        <br/>
                        <label htmlFor="Zip_Code">Zip Code</label>
                        <br/>
                        <input type="text" name="Zip_Code" className="inputs"/>
                        <br/>
                        <label htmlFor="Phone_Number">Phone Number</label>
                        <br/>
                        <input type="text" name="Phone_Number" className="inputs"/>
                        <br/>
                        <label htmlFor="Email">Email</label>
                        <br/>
                        <input type="text" name="Email" className="inputs"/>
                        <br/>
                        <button className="green_button">Submit Step-one</button>
                        {/* <Link to={this.props.NMIStep2Link} classNameName="normal_button green_button">Continue to NMI Step 2</Link> */}
                    </div>
                    <div className="subbox2">
                        <label htmlFor="Customer_Vault_ID">Customer Vault ID</label>
                        <br/>
                        <input type="text" name="Customer_Vault_ID" className="inputs"/>
                        <br/>
                        <label htmlFor="Last_Name">Last Name</label>
                        <br/>
                        <input type="text" name="Last_Name " className="inputs"/>
                        <br/>
                        <label htmlFor="Address_2">Address 2</label>
                        <br/>
                        <input type="text" name="Address_2"  className="inputs"/>
                        <br/>
                        <label htmlFor="State/Province">State/Province</label>
                        <br/>
                        <input type="text" name="State/Province " className="inputs"/>
                        <br/>
                        <label htmlFor="County">County</label>
                        <br/>
                        <input type="text" name="County"  className="inputs"/>
                        <br/>
                        <label htmlFor="Fax_Number">Fax_Number</label>
                        <br/>
                        <input type="text" name="Fax_Number " className="inputs"/>
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