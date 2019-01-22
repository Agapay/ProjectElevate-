import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //delete after

class NMISetupStep1 extends Component {
    componentDidMount() {
        document.title = "Elevate - NMI Setup Step 1";
    }

    render() {
      return (
        <div className="NMISetupStep1">
          <h1>NMI Setup</h1>
                <div class="smallboxed">
                    <h4>STEP ONE</h4>
                    <div class="subbox1">
                        <label for="Company name">Company name</label>
                        <br/>
                        <input type="text" name="Company name" class="inputs"/>
                        <br/>
                        <label for="First_name">First name</label>
                        <br/>
                        <input type="text" name="First_name" class="inputs"/>
                        <br/>
                        <label for="Address_1">Address 1</label>
                        <br/>
                        <input type="text" name="Address_1" class="inputs" />
                        <br/>
                        <label for="City">City</label>
                        <br/>
                        <input type="text" name="City" class="inputs"/>
                        <br/>
                        <label for="Zip_Code">Zip Code</label>
                        <br/>
                        <input type="text" name="Zip_Code" class="inputs"/>
                        <br/>
                        <label for="Phone_Number">Phone Number</label>
                        <br/>
                        <input type="text" name="Phone_Number" class="inputs"/>
                        <br/>
                        <label for="Email">Email</label>
                        <br/>
                        <input type="text" name="Email" class="inputs"/>
                        <br/>
                        {/* <button class="green_button">Submit Step-one</button> */}
                        <Link to={this.props.NMIStep2Link} className="normal_button green_button">Continue to NMI Step 2</Link>
                    </div>
                    <div class="subbox2">
                        <label for="Customer_Vault_ID">Customer Vault ID</label>
                        <br/>
                        <input type="text" name="Customer_Vault_ID" class="inputs"/>
                        <br/>
                        <label for="Last_Name">Last Name</label>
                        <br/>
                        <input type="text" name="Last_Name " class="inputs"/>
                        <br/>
                        <label for="Address_2">Address 2</label>
                        <br/>
                        <input type="text" name="Address_2"  class="inputs"/>
                        <br/>
                        <label for="State/Province">State/Province</label>
                        <br/>
                        <input type="text" name="State/Province " class="inputs"/>
                        <br/>
                        <label for="County">County</label>
                        <br/>
                        <input type="text" name="County"  class="inputs"/>
                        <br/>
                        <label for="Fax_Number">Fax_Number</label>
                        <br/>
                        <input type="text" name="Fax_Number " class="inputs"/>
                        <br/>
                    <div/>
            </div>
          {/* <h1>NMI</h1>
          <h2>Step 1</h2>
          <Link to={this.props.NMIStep2Link}>Continue to NMI Step 2</Link> */}
        </div>
        </div>
      );
    }
  }

export default NMISetupStep1;