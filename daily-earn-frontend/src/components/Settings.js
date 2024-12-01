// src/components/Settings.js
import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const Settings = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Settings</h1>
      <ul style={styles.settingsList}>
        <li style={styles.settingItem}>
          <span style={styles.settingNumber}>1.</span> Change Theme
          <button onClick={toggleTheme} style={styles.toggleButton}>
            {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </button>
        </li>
        {/* You can add more settings here as list items */}
        <li style={styles.settingItem}>
          <span style={styles.settingNumber}>2.</span> Another Setting
          {/* You can add functionality here */}
        </li>
        <li style={styles.settingItem}>
          <span style={styles.settingNumber}>3.</span> Privacy Settings
          {/* You can add functionality here */}
        </li>
      </ul>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    padding: '20px',
    maxWidth: '600px',
    margin: '50px auto',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    fontSize: '2rem',
    color: '#333',
    marginBottom: '20px',
  },
  settingsList: {
    listStyle: 'none',
    paddingLeft: '0',
  },
  settingItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '15px',
    backgroundColor: '#fff',
    marginBottom: '10px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
    fontSize: '1rem',
    color: '#555',
    fontWeight: 'bold',
  },
  settingNumber: {
    fontSize: '1.2rem',
    color: '#4caf50',
    marginRight: '10px',
  },
  toggleButton: {
    backgroundColor: '#4caf50',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  },
  toggleButtonHover: {
    backgroundColor: '#45a049',
  },
};

export default Settings;
