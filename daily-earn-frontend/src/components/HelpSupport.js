// src/components/HelpSupport.js
import React from 'react';
import FAQs from './FAQs';
import FeedbackForm from './FeedbackForm';

const HelpSupport = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Help & Support</h1>
      <div style={styles.section}>
        <FAQs />
      </div>
      <div style={styles.section}>
        <FeedbackForm />
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#f4f4f4',
    padding: '40px 20px',
    maxWidth: '900px',
    margin: '0 auto',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '30px',
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '25px',
    marginBottom: '30px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
};

export default HelpSupport;
