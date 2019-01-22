import React, { Component } from 'react';

class NMISetupStep2 extends Component {
    componentDidMount() {
        document.title = "Elevate - NMI Setup Step 2";
    }

    render() {
      return (
        <div>
          <h1>NMI Setup</h1>
            <h2>Step 2</h2>
            <div class="subbox1">
                <label for="Credit_Card_Number">Credit_Card_Number</label>
                <br/>
                <input type="text" name="Credit_Card_Number" class="inputs" />
                <br/>
                <label for="CVV">CVV</label>
                <br/>
                <input type="text" name="CVV" class="inputs" />
                <br/>
                <button class="green_button">Submit Step-two</button>

            </div>
            <div class="subbox2">
                <label for="Expiration_Date">Expiration Date</label>
                <br/>
                <input type="text" name="Expiration_Date" class="inputs" />
                <br/>

            
            </div>
            {/* <div className="NMISetupStep2">
          <h1>NMI</h1>
          <h2>Step 2</h2>
        </div> */}
        </div>
      );
    }
  }

export default NMISetupStep2;