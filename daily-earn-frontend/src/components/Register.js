import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import '../Styles/Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // Admin checkbox state
  const [acceptTerms, setAcceptTerms] = useState(false); // Terms acceptance state
  const [acceptPrivacyPolicy, setAcceptPrivacyPolicy] = useState(false); // Privacy Policy acceptance state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if Terms of Service and Privacy Policy are accepted
    if (!acceptTerms || !acceptPrivacyPolicy) {
      alert('You must accept the Terms of Service and Privacy Policy to proceed.');
      return;
    }

    try {
      await registerUser(username, email, password, isAdmin);
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      console.error('Registration Error:', error.response?.data?.msg || error.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        {/* Admin Checkbox */}
        <div className="form-group-checkbox">
          <label>
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
            Register as Admin (admin access granted by system)
          </label>
        </div>

        {/* Terms of Service Checkbox */}
        <div className="form-group-checkbox">
          <label>
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
            />
            I agree to the <a href="/terms" target="_blank">Terms of Service</a>
          </label>
        </div>

        {/* Privacy Policy Checkbox */}
        <div className="form-group-checkbox">
          <label>
            <input
              type="checkbox"
              checked={acceptPrivacyPolicy}
              onChange={(e) => setAcceptPrivacyPolicy(e.target.checked)}
            />
            I agree to the <a href="/privacy-policy" target="_blank">Privacy Policy</a>
          </label>
        </div>

        <button type="submit" className="submit-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
