import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Login({ setUser }) {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.email || !formData.password) {
      return setError('Email and password are required.');
    }
    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters.');
    }

    try {
      // Login → server sets refresh token cookie + sends access token
      const res = await API.post('/login', formData); // withCredentials: true is already set in API.js

      const accessToken = res.data.accessToken;
      if (accessToken) {
        localStorage.setItem('token', accessToken);

        // Optional: fetch user role
        const meRes = await API.get('/me');
        if (meRes.data.success) {
          localStorage.setItem('role', meRes.data.user.role);
          setUser({ token: accessToken, role: meRes.data.user.role });
        }

        navigate('/dashboard');
      } else {
        setError('Login failed. No token received.');
      }

    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong during login.');
    }
  };


  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account? <a href="/register">Register</a><br />
        <a href="/forgot-password">Forgot Password?</a>
      </p>
    </div>
  );
}

export default Login;
