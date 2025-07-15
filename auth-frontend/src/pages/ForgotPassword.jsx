import React, { useState } from 'react';
import API from '../services/api';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setSuccess(false);

    if (!email || !isValidEmail(email)) {
      return setMessage('Please enter a valid email address.');
    }

    try {
      const res = await API.post('/forgot-password', { email });
      setMessage(res.data.message || 'Check your email for the reset link.');
      setSuccess(true);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <div className="login-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>

      {message && (
        <p className={success ? 'success' : 'error'}>
          {message}
        </p>
      )}
    </div>
  );
}

export default ForgotPassword;
