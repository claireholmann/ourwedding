import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// ReactGA.initialize("G-Z0FQTFJMP9");

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)


// npm install react-ga4
// 
// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import ReactGA from "react-ga4";
