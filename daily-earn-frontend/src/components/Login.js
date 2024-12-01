import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import '../Styles/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await loginUser(email, password);
      localStorage.setItem('token', res.data.token);
      console.log("Your JWT Token:", res.data.token);
      navigate('/dashboard');
    } catch (error) {
      if (error.response) {
        setError(error.response.data.msg || 'Login failed. Please try again.');
      } else {
        setError('Login failed due to a network issue. Please try again.');
      }
      console.error('Login Error:', error.message);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-page-card">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
