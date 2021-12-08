import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'Router';
// import { Provider } from 'react-redux'
// import store from 'commons/store'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'styling/app.css'
import "styling/main.css"
import 'styling/jobshow.css'
import 'styling/home.css'
import "styling/job.css"

ReactDOM.render(
    <div>
        <ToastContainer
            position="top-left"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
        />
        <Router />
    </div>,
    document.getElementById('root')
);


