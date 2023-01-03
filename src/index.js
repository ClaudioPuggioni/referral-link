import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Payments from "./components/Payments";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path={"/"} element={<App />} />
      <Route path={"/:username"} element={<Payments />} />
    </Routes>
  </Router>
);
