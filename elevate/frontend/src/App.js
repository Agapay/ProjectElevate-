import React, { Component } from 'react';
import Homepage from "./AdminComponents/Homepage";
import Test from "./AdminComponents/Test";
import Login from "./CommonComponents/Login";
import AdminPortal from "./AdminComponents/AdminPortal";
import BusinessPortal from "./BusinessComponents/BusinessPortal";
import CustomerPortal from "./CustomerComponents/CustomerPortal";
import ReactDOM from "react-dom";
import DataProvider from "./AdminComponents/DataProvider";
import Table from "./AdminComponents/Table";
import ExampleComponent from "./ExampleComponent";
import {Route} from 'react-router-dom';


// const App = () => (
//   <DataProvider endpoint="api/lead/" render={data => <Table data={data} />} />
// );
// const wrapper = document.getElementById("app");
// wrapper ? ReactDOM.render(<App />, wrapper) : null;

class App extends Component {
  render() {
    console.log(window.location.href);
    return (
      <div className="App">
        <Route exact path="/" component={Homepage} />
        <Route path="/test" component={Test} />
        <Route path="/login" component={Login} />
        <Route exact path="/example" component={ExampleComponent}/>

        {/* Admin Routes */}
        <Route exact path="/admin/:id" component={AdminPortal}/>
        <Route path="/admin/:id/dashboard" component={AdminPortal}/>
        <Route path="/admin/:id/add-business" component={AdminPortal}/>
        <Route exact path="/admin/:id/business/:bid" component={AdminPortal}/>
        <Route path="/admin/:id/business/:bid/NMIsetup-1" component={AdminPortal}/>
        <Route path="/admin/:id/business/:bid/NMIsetup-2" component={AdminPortal}/>

        {/* Business Routes */}
        <Route path="/business/:id/dashboard" component={BusinessPortal}/>
        <Route path="/business/:id/subscriptions" component={BusinessPortal}/>
        <Route path="/business/:id/benefits" component={BusinessPortal}/>
        <Route path="/business/:id/add-customer" component={BusinessPortal}/>
        <Route path="/business/:id/add-subscription" component={BusinessPortal}/>
        <Route path="/business/:id/add-benefit" component={BusinessPortal}/>
        <Route exact path="/business/:id/customer/:cid" component={BusinessPortal}/>
        <Route path="/business/:id/customer/:cid/NMIsetup-1" component={BusinessPortal}/>
        <Route path="/business/:id/customer/:cid/NMIsetup-2" component={BusinessPortal}/>
        <Route exact path="/business/:id/subscription/:sid" component={BusinessPortal}/>
        <Route exact path="/business/:id/benefit/:beid" component={BusinessPortal}/>


        {/* Customer Routes */}
        <Route path="/customer/:id/dashboard" component={CustomerPortal}/>
        <Route path="/customer/:id/subscriptions/:sid" component={CustomerPortal}/>
      </div>
    );
  }
}

 /* <Route path="/frontend" component={Homepage} />
        <Route path="/" component={Homepage} />
        <Route path="/frontend/test" component={Test} />
        <Route path="/test" component={Test} />
        <Route path="./frontend/test" component={Test} />
        <Route path="./test" component={Test} /> */
      //}
        // Hello
        // <Homepage />
        //
          /* <Route path="/sign-up" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route exact path="/" component={Login} />
        <Route path="/main" component={Main} /> */

export default App;
