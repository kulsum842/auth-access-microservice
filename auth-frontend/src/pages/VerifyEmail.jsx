import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState('Verifying your email...');
  const [success, setSuccess] = useState(null); // null = loading, true = ok, false = error

  useEffect(() => {
    const status = searchParams.get('status');

    switch (status) {
      case 'success':
        setMessage('✅ Email verified successfully! You can now log in.');
        setSuccess(true);
        break;
      case 'already-verified':
        setMessage('ℹ️ Email already verified. Please log in.');
        setSuccess(true);
        break;
      case 'error':
        setMessage('❌ Verification failed or link expired.');
        setSuccess(false);
        break;
      default:
        setMessage('⚠️ Invalid verification status.');
        setSuccess(false);
    }
  }, [searchParams]);

  return (
    <div className="login-container">
      <h2>Email Verification</h2>
      <p className={success ? 'success' : 'error'}>{message}</p>

      {success && (
        <button onClick={() => navigate('/')}>
          Go to Login
        </button>
      )}
    </div>
  );
}

export default VerifyEmail;
