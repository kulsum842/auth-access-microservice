import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import API from '../services/api';

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);

  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setMessage('Invalid or missing token.');
      setTokenValid(false);
    }
  }, [token]);

  const isValidPassword = (password) => password.length >= 6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setSuccess(false);

    if (!isValidPassword(newPassword)) {
      return setMessage('Password must be at least 6 characters.');
    }

    try {
      const res = await API.post(`/reset-password?token=${token}`, {
        newPassword,
      });

      setMessage(res.data.message || 'Password reset successful.');
      setSuccess(true);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong.');
      setTokenValid(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Reset Password</h2>

      {!tokenValid ? (
        <p className="error">{message}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>New Password:</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={success}>
            Reset Password
          </button>

          {message && (
            <p className={success ? 'success' : 'error'}>{message}</p>
          )}

          {success && (
            <button type="button" onClick={() => navigate('/')}>
              Go to Login
            </button>
          )}
        </form>
      )}
    </div>
  );
}

export default ResetPassword;
