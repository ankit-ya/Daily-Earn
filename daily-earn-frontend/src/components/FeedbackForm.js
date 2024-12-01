// src/components/FeedbackForm.js
import React, { useState } from 'react';
import { submitFeedback } from '../services/api';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await submitFeedback(feedback, email); // Use API function
      setMessage(response.message || 'Feedback submitted successfully');
      setFeedback(''); // Clear the feedback input
      setEmail('');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>We Value Your Feedback</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Your feedback..."
            required
            rows="6"
            style={styles.textarea}
          />
        </div>
        <button type="submit" style={styles.submitButton}>
          Submit Feedback
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '30px',
    maxWidth: '500px',
    margin: '40px auto',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    fontSize: '1.8rem',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    marginBottom: '10px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  textarea: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  submitButton: {
    padding: '12px 20px',
    fontSize: '1rem',
    borderRadius: '8px',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  },
  submitButtonHover: {
    backgroundColor: '#45a049',
  },
  message: {
    marginTop: '15px',
    textAlign: 'center',
    color: '#333',
    fontSize: '1rem',
  },
};

export default FeedbackForm;
