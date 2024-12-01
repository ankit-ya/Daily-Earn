// src/pages/AdminFeedback.js
import React, { useEffect, useState } from 'react';
import { getFeedbacks } from '../services/api';

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const data = await getFeedbacks(); // Use API function to get feedback
        setFeedbacks(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchFeedbacks();
  }, []);

  const containerStyle = {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    maxWidth: '900px',
    margin: '0 auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const headingStyle = {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '20px',
    textAlign: 'center',
  };

  const errorStyle = {
    color: '#ff4d4d',
    backgroundColor: '#ffe6e6',
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '20px',
    textAlign: 'center',
  };

  const feedbackItemStyle = {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '15px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const feedbackTextStyle = {
    fontSize: '1rem',
    color: '#555',
    lineHeight: '1.6',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>All User Feedback</h1>
      {error && <p style={errorStyle}>{error}</p>}
      <ul>
        {feedbacks.map((feedback, index) => (
          <li key={index} style={feedbackItemStyle}>
            <p style={feedbackTextStyle}>{feedback.feedback}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminFeedback;
