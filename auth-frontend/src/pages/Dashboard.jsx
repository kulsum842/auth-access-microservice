import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get('/me');
        if (res.data.success && res.data.user) {
          setUser(res.data.user);
          localStorage.setItem('role', res.data.user.role);
        } else {
          setError('Unauthorized access. Please log in.');
        }
      } catch (err) {
        console.error('❌ Fetch /me failed:', err.response?.data || err);

        const status = err.response?.status;

        if (status === 401 || status === 403) {
          // Delay redirect slightly to allow Axios interceptor to retry
          setError('Session expired. Redirecting to login...');
          setTimeout(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            navigate('/');
          }, 300);
        } else {
          setError('Something went wrong. Please try again.');
        }
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await API.post('/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      setUser(null);
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err.response?.data || err.message);
      navigate('/');
    }
  };

  return (
    <div className="login-container">
      <h2>Dashboard</h2>

      {user ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      ) : (
        <p className="error">{error || 'Loading user info...'}</p>
      )}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
