import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBell, FaCoins } from 'react-icons/fa';
import { ThemeContext } from '../contexts/ThemeContext';
import './Navbar.css';
import '../index.css'; // For global styles

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile menu
  const [isTaskDropdownOpen, setIsTaskDropdownOpen] = useState(false); // For task dropdown
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false); // For profile dropdown
  const { darkMode, toggleTheme } = useContext(ThemeContext); // Access theme and toggle from context
  const navigate = useNavigate();

  const categories = ['Surveys', 'Content Writing', 'Reading Stories', 'Data Entry']; // Task categories

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirect to login page on logout
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle mobile menu
  };

  const handleCategorySelect = (category) => {
    navigate(`/task-list?category=${category}`); // Navigate to task list with selected category
    setIsTaskDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <nav className={`navbar ${darkMode ? 'dark-navbar' : 'light-navbar'}`}>
      {/* Replace text with logo image */}
      <div className="logo">
  <img src="/image/logo.webp" alt="Logo" className="logo-image" />
</div>

      {/* Hamburger Icon for Mobile Menu */}
      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li><Link to="/">Home</Link></li>
        
        {/* Task Dropdown */}
        <li
          onMouseEnter={() => setIsTaskDropdownOpen(true)}
          onMouseLeave={() => setIsTaskDropdownOpen(false)}
        >
          Tasks ▼
          <ul className={`dropdown ${isTaskDropdownOpen ? 'show' : ''}`}>
            {categories.map((category) => (
              <li key={category} onClick={() => handleCategorySelect(category)}>
                {category}
              </li>
            ))}
          </ul>
        </li>

        {/* Earnings Dropdown */}
        <li>
          Earnings <FaCoins />
          <ul className="dropdown">
            <li><Link to="/wallet">Wallet</Link></li>
            <li><Link to="/withdraw">Withdraw</Link></li>
            <li><Link to="/transaction-history">Transaction History</Link></li>
        
          </ul>
        </li>

        <li><Link to="/leaderboard">Leaderboard</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/notifications"><FaBell /> Notifications</Link></li>

        {/* Profile Dropdown */}
        <li
          onMouseEnter={() => setIsProfileDropdownOpen(true)}
          onMouseLeave={() => setIsProfileDropdownOpen(false)}
        >
          Profile ▼
          <ul className={`dropdown ${isProfileDropdownOpen ? 'show' : ''}`}>
            <li><Link to="/my-profile">My Profile</Link></li>
            <li><Link to="/settings">Settings</Link></li>
            {/* Dark mode toggle */}
            <li onClick={toggleTheme}>
              {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </li>
        <li><Link to="/referral">Referral Program</Link></li>
            <li onClick={handleLogout}>Logout</li>
          </ul>
        </li>

        <li><Link to="/help">Help</Link></li>
        <li>
          Admin  
          <ul className="dropdown">
        <li><Link to="/admin/login">Login</Link></li>
        <li><Link to="/admin/register">Register</Link></li>
        
          </ul>
        </li>
      
      </ul>
    </nav>
  );
};

export default Navbar;
