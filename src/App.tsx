import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Admin from "./pages/admin/Admin";

function App() {
  return (
    <Routes>
      {/*<Route path="/" element={<Home />} />*/}
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
