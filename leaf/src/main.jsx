// src/index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";  // your main App component

// Grab the root element from index.html
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the App inside BrowserRouter for routing
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

