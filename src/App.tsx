import React from "react";
import { Routes, Route } from "react-router-dom";
import Admin from "./pages/admin/Admin";
import Home from "./pages/customer/Home";
import MainLayout from "./layouts/MainLayout";
import SignInForm from "./components/mutual/SignInForm";
import OTPForm from "./components/mutual/OTPForm";
import Products from "./pages/customer/Products";
import AppointmentForm from "./components/customer/Appointment";
import PrivateRoute from "./components/mutual/PrivateRoute";
import UnauthorizationForm from "./components/mutual/UnauthorizationForm";
import Information from "./pages/customer/Information";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<SignInForm />} />
        <Route path="/verifyOtp" element={<OTPForm />} />
        <Route path="/products" element={<Products />} />
        <Route path="/appointment" element={<AppointmentForm />} />
        <Route path="/unauthorized" element={<UnauthorizationForm />} />
        <Route path="/information" element={<Information />} />
      </Route>
      <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<Admin />} />
      </Route>
      <Route element={<PrivateRoute allowedRoles={["doctor"]} />}>
        <Route path="/doctor" element={<Admin />} />
      </Route>
    </Routes>
  );
}

export default App;
