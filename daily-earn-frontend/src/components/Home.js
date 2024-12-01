import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import { UserContext } from '../contexts/UserContext';

const Home = () => {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in and redirect to the dashboard
    if (userData && userData.username) {
      navigate('/dashboard', { replace: true }); // Redirect without adding to history
    }
  }, [userData, navigate]);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Earn Real Money by Completing Simple Tasks</h1>
          <p>Join our community and start earning through data entry, surveys, content writing, and more.</p>
          <Link to="/register" className="hero-btn">Join Now</Link>
        </div>
        <div className="hero-image">
          <img src="/image/homeimage.webp" alt="Earn Online" />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="work-image">
          <img src="/image/how-it-works.webp" alt="How It Works" />
        </div>
        <div className="work-content">
          <h2>How It Works</h2>
          <ol>
            <li><strong>Sign Up:</strong> Create an account to get started.</li>
            <li><strong>Complete Tasks:</strong> Choose tasks like surveys or data entry.</li>
            <li><strong>Earn Coins:</strong> Earn rewards as you complete tasks.</li>
            <li><strong>Withdraw Earnings:</strong> Cash out through secure options.</li>
          </ol>
          <Link to="/register" className="work-btn">Get Started</Link>
        </div>
      </section>

      {/* Features and Benefits */}
      <section className="features">
        <h2>Features & Benefits</h2>
        <div className="features-list">
          <div className="feature-item">
            <h3>Flexible Earnings</h3>
            <p>Earn from home at your convenience.</p>
          </div>
          <div className="feature-item">
            <h3>Real-Time Notifications</h3>
            <p>Receive instant updates on new tasks and opportunities.</p>
          </div>
          <div className="feature-item">
            <h3>Secure Withdrawals</h3>
            <p>Quick and secure payout options like PayPal.</p>
          </div>
        </div>
      </section>

      {/* Login/Register Section */}
      <section className="join-us">
        <h2>Join Daily Earn Today!</h2>
        <p>Sign up to start earning real rewards.</p>
        <Link to="/login" className="join-btn">User Login</Link>
        <Link to="/register" className="join-btn">User Register</Link>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <div className="footer-column">
              <h4>About</h4>
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/help">Contact</Link></li>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Tasks</h4>
              <ul>
                <li><Link to="/task-list?category=Data Entry">Data Entry</Link></li>
                <li><Link to="/task-list?category=Surveys">Surveys</Link></li>
                <li><Link to="/task-list?category=Content Writing">Content Writing</Link></li>
                <li><Link to="/task-list?category=Reading Stories">Reading Stories</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Earnings</h4>
              <ul>
                
                <li><Link to="/wallet">Wallet</Link></li>
                <li><Link to="/withdraw">Withdraw</Link></li>
                <li><Link to="/transaction-history">Transaction History</Link></li>
              </ul>
            </div>
          </div>
          <p>© 2024 Daily Earn. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
