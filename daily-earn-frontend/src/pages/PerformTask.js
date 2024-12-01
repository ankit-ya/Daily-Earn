import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { submitTask, fetchWithdrawals } from '../services/api';

const PerformTask = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const task = location.state?.task || { title: 'Unknown Task', description: 'No description available.' };
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [reward, setReward] = useState(0); // Store the reward for the task

  const handleTaskCompletion = async () => {
    try {
      // Call the submitTask API
      const response = await submitTask(task._id, localStorage.getItem('token'));

      if (response.reward) {
        setReward(response.reward); // Update reward
        setTaskCompleted(true); // Mark task as completed

        // Fetch updated withdrawals (optional)
        const withdrawals = await fetchWithdrawals(localStorage.getItem('token'));
        console.log('Updated withdrawals:', withdrawals);

        // Notify user and navigate back to task list
        setTimeout(() => {
          alert(`Task "${task.title}" completed! Reward: $${response.reward}`);
          navigate('/task-list');
        }, 1000);
      } else {
        throw new Error('No reward data received from the server');
      }
    } catch (error) {
      console.error('Error completing task:', error.message);
      alert('Task Already Done.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Perform Task</h2>
      <div style={styles.taskDetails}>
        <h3 style={styles.taskTitle}>{task.title}</h3>
        <p style={styles.taskDescription}>{task.description}</p>
      </div>

      <div style={styles.formContainer}>
        <input
          type="text"
          name="dataEntry"
          style={styles.input}
          placeholder="Type data here..."
          required
        />
        {task.type && (
          <div style={styles.taskType}>{`Perform ${task.type} task`}</div>
        )}
      </div>

      <button
        style={taskCompleted ? styles.disabledButton : styles.submitButton}
        onClick={handleTaskCompletion}
        disabled={taskCompleted}
      >
        {taskCompleted ? 'Task Completed' : 'Submit Task'}
      </button>

      {taskCompleted && (
        <div style={styles.notification}>
          🎉 Task "{task.title}" completed! Reward: <strong>${reward}</strong>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    animation: 'fadeIn 1s ease-in-out',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#4caf50',
  },
  taskDetails: {
    marginBottom: '20px',
    textAlign: 'left',
    padding: '15px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
  },
  taskTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
  },
  taskDescription: {
    fontSize: '16px',
    color: '#666',
    marginTop: '10px',
  },
  formContainer: {
    margin: '20px 0',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    marginBottom: '10px',
    outline: 'none',
    transition: 'box-shadow 0.3s',
  },
  taskType: {
    fontSize: '14px',
    color: '#555',
    marginTop: '5px',
  },
  submitButton: {
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#4caf50',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
  },
  disabledButton: {
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#ccc',
    border: 'none',
    borderRadius: '5px',
    cursor: 'not-allowed',
  },
  notification: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#e8f5e9',
    borderRadius: '8px',
    color: '#4caf50',
    fontSize: '16px',
    fontWeight: 'bold',
    animation: 'fadeInUp 0.5s ease-out',
  },
  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  '@keyframes fadeInUp': {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
};

export default PerformTask;
