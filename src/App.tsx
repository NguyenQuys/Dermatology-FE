import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Admin from "./pages/admin/Admin";
import Home from "./pages/customer/Home";
import SignIn from "./pages/customer/SignIn";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
}

export default App;
