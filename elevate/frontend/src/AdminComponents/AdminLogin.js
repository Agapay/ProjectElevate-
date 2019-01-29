import React, { Component } from 'react';
import Navbar from './Navbar'; //Navbar.js
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class AdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
          username: "",
          password: "",
          remeberMe: false,
          error: false,
        }
    }

    componentDidMount() {
        document.title = "Elevate - Admin Login";
    }

    onSubmit = (e) => {
        e.preventDefault();
        document.title = "Elevate - Admin Login";
        fetch('http://localhost:8000/token-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: this.state.username, password: this.state.password}) // data is username and password
            })
            .then(res => res.json())
            .then(json => {
                localStorage.setItem('token', json.token);
                console.log(json.token);
                fetch('http://localhost:8000/core/current_user/', {
                    headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                    }
                })
                    .then(res => res.json())
                    .then(json => {
                        console.log(json);
                        if(json.detail) {
                            this.setState({
                                error: true,
                            })
                        } else {
                            localStorage.setItem('username', json.username)
                            window.location.replace("http://127.0.0.1:8000/frontend/admin/0/dashboard");
                        }
                    // this.setState({ username: json.username });
                    });

            });
        // handle logging in
    }

    onChange = (e, inputName) => {
        this.setState({
            [inputName]: e.target.value,
        });
    }

    toggleCheckbox = (e) => {
        this.setState({
            remeberMe: !this.state.remeberMe,
        });
    }

    render() {
      return (
        <div>
        <Navbar />
        <section className="login-page row justify-content-center align-items-center">
            <form className="login-container col-6" onSubmit={this.onSubmit}>
                <h1>Elevate</h1>
                <h2>Admin</h2>
                <div className="row justify-content-center">
                    <div className="under-input-container">
                        <input type="text" placeholder="Username" onChange={(e) => {this.onChange(e, "username")}} value={this.state.username} required/>
                        <input type="password" placeholder="Password" onChange={(e) => {this.onChange(e, "password")}} value={this.state.password} required/>
                        {  this.state.error ? <div>Credentials error</div> : null}
                        <label><input type="checkbox" checked={this.state.remeberMe} onClick={this.toggleCheckbox} /> Remember Me </label>
                        <a href="#">Forgot Password</a>
                    </div>
                </div>
                
                <button className="purple" type="submit">Login</button>
            </form>
        </section>
        </div>

      );
    }
  }

export default AdminLogin;







