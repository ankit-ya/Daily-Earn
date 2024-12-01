// src/components/FAQs.js
import React from 'react';

const FAQs = () => {
  const faqs = [
    {
      question: "What is Daily Earn?",
      answer: "Daily Earn is a platform that allows users to complete tasks and earn money."
    },
    {
      question: "How can I withdraw my earnings?",
      answer: "You can withdraw your earnings by going to the Withdraw section in your dashboard."
    },
    {
      question: "Who can register as a user?",
      answer: "Anyone can register as a user unless specified otherwise."
    }
    // Add more FAQs as needed
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Frequently Asked Questions</h2>
      <div style={styles.faqList}>
        {faqs.map((faq, index) => (
          <div key={index} style={styles.faqItem}>
            <h4 style={styles.question}>
              <span style={styles.number}>{index + 1}. </span>
              {faq.question}
            </h4>
            <p style={styles.answer}>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    padding: '30px',
    maxWidth: '700px',
    margin: '40px auto',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    fontSize: '2rem',
    marginBottom: '20px',
  },
  faqList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  faqItem: {
    padding: '15px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s, box-shadow 0.3s',
  },
  question: {
    fontSize: '1.2rem',
    color: '#333',
    marginBottom: '10px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
  },
  number: {
    backgroundColor: '#4caf50',
    color: '#fff',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    textAlign: 'center',
    marginRight: '10px',
    fontSize: '1rem',
  },
  answer: {
    fontSize: '1rem',
    color: '#666',
  },
};

export default FAQs;
