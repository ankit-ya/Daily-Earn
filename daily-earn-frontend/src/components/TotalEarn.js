import React, { useEffect, useState } from 'react';
import { fetchEarnings } from '../services/api'; // Adjust the path as necessary

const TotalEarn = () => {
  const [earnings, setEarnings] = useState([]);
  const [totalEarned, setTotalEarned] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEarningsData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to view your earnings.');
        return;
      }

      try {
        const response = await fetchEarnings(token); // Use the fetchEarnings function from the API
        const earningsData = response.data;
        setEarnings(earningsData);

        // Calculate total earnings
        const total = earningsData.reduce((sum, entry) => sum + entry.amount, 0);
        setTotalEarned(total);
      } catch (err) {
        setError('Failed to fetch earnings. Please try again.');
      }
    };

    fetchEarningsData();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Total Earnings</h2>
      {error && <p style={styles.errorText}>{error}</p>}

      <div style={styles.totalEarningsContainer}>
        <p style={styles.totalEarnedText}><strong>Total Coins Earned: </strong> {totalEarned}</p>
      </div>

      <h3 style={styles.historyHeading}>Earnings History</h3>
      {earnings.length === 0 ? (
        <p style={styles.noEarningsText}>You have no earnings yet.</p>
      ) : (
        <ul style={styles.earningsList}>
          {earnings.map((entry) => (
            <li key={entry._id} style={styles.earningItem}>
              <div style={styles.earningDetails}>
                <p style={styles.earningDate}>Date: {new Date(entry.date).toLocaleDateString()}</p>
                <p style={styles.earningAmount}>Amount: {entry.amount} coins</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: 'auto',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    color: '#4CAF50',
    fontSize: '2.2em',
    marginBottom: '20px',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: '1.1em',
    marginBottom: '20px',
  },
  totalEarningsContainer: {
    backgroundColor: '#f0f0f0',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  totalEarnedText: {
    fontSize: '1.5em',
    fontWeight: 'bold',
    color: '#333',
  },
  historyHeading: {
    fontSize: '1.8em',
    color: '#333',
    marginBottom: '15px',
    borderBottom: '2px solid #ddd',
    paddingBottom: '10px',
  },
  noEarningsText: {
    textAlign: 'center',
    fontSize: '1.2em',
    color: '#888',
  },
  earningsList: {
    listStyleType: 'none',
    padding: 0,
  },
  earningItem: {
    backgroundColor: '#f9f9f9',
    marginBottom: '15px',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
  },
  earningItemHover: {
    transform: 'scale(1.02)',
  },
  earningDetails: {
    display: 'flex',
    flexDirection: 'column',
  },
  earningDate: {
    fontSize: '1.1em',
    color: '#555',
  },
  earningAmount: {
    fontSize: '1.2em',
    color: '#4CAF50',
    marginTop: '5px',
  },
};

export default TotalEarn;
