
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {/* BrowserRouter enables routing for the entire application.
       Without BrowserRouter, Link, Route, Routes,
       useNavigate, useParams, etc. will not work. */}

    <App />
  </BrowserRouter>
);