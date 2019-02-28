import React, { Component } from 'react';

class NMISetupStep2 extends Component {
    constructor(props) {
      super(props);
      this.state = {
        credit_card_number: "",
        cvv: "",
        exp_date: "",
      }
    }

    componentDidMount() {
        document.title = "Elevate - NMI Setup Step 2";
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
            <h2>Step 2</h2>
            <form onSubmit={this.submitForm}>
              <div class="subbox1">
                  <label htmlFor="credit_card_number">Credit Card Number</label>
                  <br/>
                  <input id="credit_card_number" type="text" name="credit_card_number" class="inputs" value={this.state.credit_card_number} onChange={this.onChange} required/>
                  <br/>
                  <label htmlFor="cvv">CVV</label>
                  <br/>
                  <input id="cvv" type="text" name="cvv" class="inputs" value={this.state.cvv} onChange={this.onChange} required/>
                  <br/>
                  <button class="green_button">Submit Step-two</button>

              </div>
              <div class="subbox2">
                  <label htmlFor="exp_date">Expiration Date</label>
                  <br/>
                  <input id="exp_date" type="text" name="exp_date" class="inputs" value={this.state.exp_date} onChange={this.onChange} required/>
                  <br/>


              </div>
            </form>

            {/* <div className="NMISetupStep2">
          <h1>NMI</h1>
          <h2>Step 2</h2>
        </div> */}
        </div>
      );
    }
  }

export default NMISetupStep2;
