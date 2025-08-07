import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './features/Home/Homepage';
import Login from './components/Login';
import Dashboard from './features/Dashboard/Dashboard';
import ProtectedRoute from './core/ProtectedRoute';
import Register from './components/Register';
import Forgetpwd from './components/Forgotpwd';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetPwd" element={<Forgetpwd />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
