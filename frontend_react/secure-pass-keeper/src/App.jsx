import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HeaderNavbar from './components/common/HeaderNavbar/HeaderNavbar.jsx';
import LoginSignup from './components/auth/LoginSignup/LoginSignup.jsx';
import Dashboard from './components/dashboard/Dashboard/Dashboard.jsx';
import AddPasswordStoreForm from './components/dashboard/AddPassword/AddPasswordStoreForm.jsx';

function App() {
  return (
    <Router>
        <HeaderNavbar />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-password-form" element={<AddPasswordStoreForm />} />
          <Route path="/" element={<LoginSignup />} />
        </Routes>
    </Router>
  );
}

export default App;
