import React from "react";
import { Routes, Route } from "react-router-dom";
import Admin from "./pages/admin/Admin";
import Home from "./pages/customer/Home";
import MainLayout from "./layouts/MainLayout";
import SignInForm from "./components/mutual/SignInForm";
import OTPForm from "./components/mutual/OTPForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="sign-in" element={<SignInForm />} />
        <Route path="verifyOtp" element={<OTPForm />} />
      </Route>
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
