import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Or your API service

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/leaderboard'); // API URL
        setUsers(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.error : 'Server error');
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Leaderboard</h2>
      {error && <p style={styles.error}>{error}</p>}
      <div style={styles.tableContainer}>
        <div style={styles.tableHeader}>
          <div style={styles.headerItem}>Rank</div>
          <div style={styles.headerItem}>Username</div>
          <div style={styles.headerItem}>Earnings</div>
          <div style={styles.headerItem}>Tasks</div>
          <div style={styles.headerItem}>Coins</div>
        </div>
        {users.map((user, index) => (
          <div
            style={{
              ...styles.row,
              backgroundColor:
                index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : index === 2 ? '#cd7f32' : '#fff',
              animation: 'fadeIn 0.5s ease-in-out',
            }}
            key={user._id}
          >
            <div style={styles.cell}>{index + 1}</div>
            <div style={styles.cell}>{user.username}</div>
            <div style={styles.cell}>{`₹${user.totalEarnings.toLocaleString()}`}</div>
            <div style={styles.cell}>{user.tasksCompleted}</div>
            <div style={styles.cell}>{user.coins}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: '#f4f6f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '90%',
    margin: '20px auto',
    animation: 'fadeIn 0.5s ease-in-out',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    fontSize: '2rem',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '1rem',
  },
  tableContainer: {
    borderRadius: '10px',
    overflow: 'hidden',
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s ease',
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr 1fr 1fr 1fr',
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerItem: {
    fontSize: '1.1rem',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr 1fr 1fr 1fr',
    padding: '15px',
    borderBottom: '1px solid #f0f0f0',
    textAlign: 'center',
    transition: 'background-color 0.3s, transform 0.3s',
    cursor: 'pointer',
  },
  cell: {
    fontSize: '1rem',
    color: '#555',
  },
  rowHover: {
    backgroundColor: '#f9f9f9',
  },
};

export default Leaderboard;
