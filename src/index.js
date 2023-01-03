import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Payments from "./components/Payments";
import SignedUp from "./components/SignedUp";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path={"/"} element={<App />} />
      <Route path={"/:referral"} element={<Payments />} />
      <Route path={"/success"} element={<SignedUp />} />
    </Routes>
  </Router>
);
