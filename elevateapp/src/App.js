import React, { Component } from 'react';
import Nav from './components/Nav';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: ''
    };
  }

  componentDidMount() {
    if (this.state.logged_in) {
      // fetch('http://localhost:8000/business/current_business/', {
      //   headers: {
      //     Authorization: `JWT ${localStorage.getItem('token')}`
      //   }
      // })
      //   .then(res => res.json())
      //   .then(json => {
      //     this.setState({ username: json.username });
      //   });
      axios({
        url: 'http://localhost:8000/business/current_business/',
        method: 'get',
        headers: {
              Authorization: `JWT ${localStorage.getItem('token')}`
            }
      }).then(res => {
        console.log(res);
        let json = res.data;
                  this.setState({ username: json.username });

      }).catch(error => {
        console.log(error);
      })
    }
  }

  handle_login = (e, data) => {
    e.preventDefault();
    console.log(data);
    // fetch('http://localhost:8000/token-auth/', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   data: {
    //     username: data.username,
    //     password: data.password
    //   }
    // })
    //   .then(res => {
    //     console.log(res)
    //     res.json()
    //     })
    //   .then(json => {
    //     console.log(json);
    //     localStorage.setItem('token', json.token);
    //     this.setState({
    //       logged_in: true,
    //       displayed_form: '',
    //       username: json.user.username
    //     });
    //   });

      axios({
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        url: `http://localhost:8000/token-auth/`,
        data: {
          username: data.username,
          password: data.password
        }
      }).then(res => {
        console.log(res)
        let json = res.data;
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.user.username
        });
        // res.json()
        
        })
      // .then(json => {
      //   console.log(json);
      //   localStorage.setItem('token', json.token);
      //   this.setState({
      //     logged_in: true,
      //     displayed_form: '',
      //     username: json.user.username
      //   });
      // });
  };

  handle_signup = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/business/businesses/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.username
        });
      });
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, username: '' });
  };

  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };

  render() {
    let form;
    switch (this.state.displayed_form) {
      case 'login':
        form = <LoginForm handle_login={this.handle_login} />;
        break;
      case 'signup':
        form = <SignupForm handle_signup={this.handle_signup} />;
        break;
      default:
        form = null;
    }

    return (
      <div className="App">
        <Nav
          logged_in={this.state.logged_in}
          display_form={this.display_form}
          handle_logout={this.handle_logout}
        />
        {form}
        <h3>
          {this.state.logged_in
            ? `Hello, ${this.state.username}`
            : 'Please Log In'}
        </h3>
      </div>
    );
  }
}

export default App;