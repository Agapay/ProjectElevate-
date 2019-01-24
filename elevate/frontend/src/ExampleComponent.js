import React, { Component } from 'react';

class ExampleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attribute: "the attribute", //is in our state
      text: "text to change",
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value, //attribute = what the user types in
    });
  }

  onSubmit = (e) => {
    e.preventDefault() //prevents the form from submitting
    this.setState({
      text: this.state.attribute
    })
  }

  alertHello = (e) => {
    alert("Hello");
  }

  render() {
    return (
      <div>
        <h1>Example Component</h1>
        <FormComponent //better name is FormComponent
          onChange={this.onChange} 
          onSubmit={this.onSubmit} 
        />
        <h1>{this.state.text}</h1>
        <button onClick={this.alertHello}>Alert Hello Button</button>
      </div>
    );
  }
}

/* 
  normally you only have one class per js file
  to use other components you would load them in by saying...
  import FormComponent from (insert a string of the where the file is located in the directory) 
  look at App.js to see how I imported ExampleComponent
*/

class FormComponent extends Component { // is the form part
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
          <label>
            <div>label to change child text</div>
            <input value={this.props.attribute} name="attribute" onChange={this.props.onChange} required/>
          </label>
          <button>Submit</button>
      </form>
    )
  }
}

//other notes
//this.props contains info on parent components

export default ExampleComponent;