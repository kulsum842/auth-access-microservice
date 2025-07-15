// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
// import AdminDashboard from './pages/AdminDashboard';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function App() {
  const [user, setUser] = useState(null);

  // Get user info from localStorage or future /me call
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role'); // optionally saved after login
    if (token) {
      setUser({ token, role });
    }
  }, []);

  // Protected Route Component
  const ProtectedRoute = ({ children, requiredRole }) => {
    if (!user?.token) return <Navigate to="/" />;
    if (requiredRole && user.role !== requiredRole) return <Navigate to="/dashboard" />;
    return children;
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        {/* <Route path="/admin" element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } /> */}
      </Routes>
    </Router>
  );
}

export default App;
