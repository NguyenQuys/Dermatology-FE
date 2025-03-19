import React from "react";
import { Routes, Route } from "react-router-dom";
import Admin from "./pages/admin/Admin";
import Home from "./pages/customer/Home";
import MainLayout from "./layouts/MainLayout";
import SignInForm from "./components/mutual/SignInForm";
import OTPForm from "./components/mutual/OTPForm";
import Products from "./pages/customer/Products";
import AppointmentForm from "./components/customer/Appointment";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<SignInForm />} />
        <Route path="/verifyOtp" element={<OTPForm />} />
        <Route path="/products" element={<Products />} />
        <Route path="/appointment" element={<AppointmentForm />} />
      </Route>
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
