import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Payments from "./components/Payments";
import SignedUp from "./components/SignedUp";
import Page404 from "./components/Page404";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path={"/"} element={<App />} />
      <Route path={"/404"} element={<Page404 />} />
      <Route path={"/:referral"} element={<Payments />} />
      <Route path={"/success/:referrer"} element={<SignedUp />} />
    </Routes>
  </Router>
);
