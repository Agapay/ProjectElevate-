import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //delete after
import axios from 'axios';

import ListSubscriptions from './ListSubscriptions'

/*********
 * If the user has not been setup a customer vault on nmi setup,
 * This is where the actual process for business to customer would take place
 */

const mockupSubscriptions = [ //id is benefit id
  { name: "Stadard Package", selected: false, id:0 },
  { name: "Premium Package", selected: false, id:1 },
  { name: "Premium+ Package", selected: false, id:2 },
]

class EnlistSubscriptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: {},
            subscriptions: [],
            subscriptionsSelectedArray: [], //for selecting in the beginning
            api_key: "",
            username: "",

        }
    }

    isSelected(subscriptionID) { //num = th
        var elementFound = this.state.subscriptionsSelectedArray.find((element) => {
            return element === subscriptionID;
        });
        return elementFound !== undefined;
    }

    getSubscriptions() {
        fetch(`/api/users/businesses/${this.props.id}/subscriptions`, {
            method: 'GET',
            headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
            }
          })
            .then(res => res.json())
            .then(json => {
                if(json.detail) { //error handling
                    console.log(json.detail);
                    this.props.logout();
                } else {
                    console.log(json); //list of businesses
                    let newSubs = json.subscriptions.map((sub) => { //format backend json to frontend
                      let newSub = {
                          ...sub,
                          name: sub.title,
                          selected: this.isSelected(sub.id),
                      };
                      return newSub;
                    });
                    this.setState({
                      subscriptions: newSubs,
                    })
                }
            });
    }

    returnSelectedSubscriptions() {
      let selectedSubscriptions = []
      for (let subscription of this.state.subscriptions) {
          if (subscription.selected === true) {
              selectedSubscriptions.push(subscription.id);
          }
      }
      return selectedSubscriptions
    }

    getCustomer = () => {
        axios({
            method: 'GET',
            url: `/api/users/customer/${this.props.cid}`,
            headers: {
                'Authorization': `JWT ${localStorage.getItem('token')}`
            },
        }).then((response) => {
            console.log(response);
            const customer = response.data;
            if (customer.business !== parseInt(this.props.id)) { //if the customer does not belong to the business log them out
                this.props.logout(); 
            } else {
                this.setState({
                    api_key: customer.user_api_key,
                    username: customer.username,
                    subscriptionsSelectedArray: customer.subscriptions,
                });
                this.getSubscriptions();
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    addCustomer = () => {
        axios({
            method: 'PATCH',
            url: `/api/users/customer/${this.props.cid}`,
            headers: {
                'Authorization': `JWT ${localStorage.getItem('token')}`
                },
            data: {
                username: this.state.username,
                // password: this.state.password,
                // business_name: this.state.business_name,
                business: this.props.id,
                user_api_key: this.state.api_key,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                phone_number: this.state.phone_number,
                street_home_address: this.state.street_address,
                city_home_address: this.state.city,
                state_home_address: this.state.state,
                apt_home_address: this.state.suite_apt,
                zip_home_address: this.state.postal_code,
                subscriptions: this.returnSelectedSubscriptions(this.state.subscriptions),
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

    componentDidMount() {
        document.title = "Elevate - Edit Customer";
        //actual axios function to load data of user
        console.log(this.props.cid);
        this.getCustomer();
    }

    submitForm = (e) => { // function to call backend and add the business
        e.preventDefault();
        // console.log(this.state);
        // this.addCustomer();
        // this.addCustomer();
        // this.enlistSubscriptions();
    }

    toggleEdit = (e) => {
        this.setState({
            isEditing: !this.state.isEditing,
            emailError: false,
        })
    }

    updateSelected = (e, index) => {
      const subscriptions = this.state.subscriptions;
      subscriptions[index].selected = !subscriptions[index].selected;
      this.setState({
          subscriptions,
      })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    render() {
      console.log(this.state);
      return (
        <div className="EnlistSubscriptions">
          <h1>Enlist Subscriptions</h1>
          {/* if the api_key exists then show subscriptions, else if not show an error to first create the customer vault*/}
          <form onSubmit={this.submitForm}>
              <div className="smallboxed">
                <h4>Subscriptions</h4>
                <ListSubscriptions subscriptions={this.state.subscriptions} updateSelected={this.updateSelected} editPage={true} isEditing={true}/>
                <br/>
                <span>
                    <button type="submit" className="green_button">Save</button>
                    <br/>
                    <br/>
                </span>
            </div>
          </form>
        </div>
      );
    }
  }


export default EnlistSubscriptions;