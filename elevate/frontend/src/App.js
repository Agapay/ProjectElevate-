import React, { Component } from 'react';
import Homepage from "./AdminComponents/Homepage";
import Test from "./AdminComponents/Test";
import Login from "./CommonComponents/Login";
import AdminPortal from "./AdminComponents/AdminPortal";
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
        <Route path="/admin-login" component={AdminLogin} />
        <Route exact path="/admin/:id" component={AdminPortal}/>
        <Route path="/admin/:id/dashboard" component={AdminPortal}/>
        <Route path="/admin/:id/add-business" component={AdminPortal}/>
        <Route exact path="/admin/:id/business/:bid" component={AdminPortal}/>
        <Route path="/admin/:id/business/:bid/NMIsetup-1" component={AdminPortal}/>
        <Route path="/admin/:id/business/:bid/NMIsetup-2" component={AdminPortal}/>
        <Route exact path="/example" component={ExampleComponent}/>
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

