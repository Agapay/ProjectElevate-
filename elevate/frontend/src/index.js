import App from "./components/App";
import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';

console.log(window.location.href);


ReactDOM.render( (
    <BrowserRouter
        basename="/frontend">
        <App />
    </BrowserRouter>
    ), 
    document.getElementById('app'));
// registerServiceWorker();

// const wrapper = document.getElementById("app");
// wrapper ? ReactDOM.render(<App />, wrapper) : null;