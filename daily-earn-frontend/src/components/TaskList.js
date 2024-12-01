import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const TaskList = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Parse query parameters to get the selected category
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get('category');

  useEffect(() => {
    const fetchTasks = async () => {
      if (!selectedCategory) {
        setError('Please select a category.');
        return;
      }

      setLoading(true);
      setError(''); // Reset error
      try {
        const response = await axios.get(
          `http://localhost:5000/api/tasks/category/${selectedCategory}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        if (response.data && Array.isArray(response.data)) {
          setTasks(response.data.filter((task) => !task.completed)); // Only show tasks that are not completed
        } else {
          setError('No tasks available for the selected category.');
        }
      } catch (err) {
        setError(
          err.response?.data?.message || 'Failed to fetch tasks. Please try again later.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [selectedCategory]);

  const handleStartTask = (task) => {
    navigate('/task-instructions', { state: { task } });
  };

  return (
    <div
      style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
      }}
    >
      <h2
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: '#4caf50',
        }}
      >
        {selectedCategory ? `Available Tasks in ${selectedCategory}` : 'No Category Selected'}
      </h2>

      {loading && <p style={{ color: '#4caf50' }}>Loading tasks...</p>}
      {error && <p style={{ color: 'red', marginBottom: '20px' }}>{error}</p>}
      {!loading && !error && tasks.length === 0 && (
        <p style={{ fontSize: '16px', color: '#666' }}>
          No tasks available in this category.
        </p>
      )}

      <ul
        style={{
          listStyleType: 'none',
          padding: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginTop: '20px',
        }}
      >
        {tasks.map((task) => (
          <li
            key={task._id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              padding: '15px',
              textAlign: 'left',
              background: '#fff',
            }}
          >
            <div>
              <h4
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  marginBottom: '10px',
                  color: '#333',
                }}
              >
                {task.title}
              </h4>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                {task.description}
              </p>
              <p
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#4caf50',
                  marginBottom: '10px',
                }}
              >
                Reward: ₹{task.reward}
              </p>
            </div>
            <button
              style={{
                backgroundColor: '#4caf50',
                color: '#fff',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
                marginTop: '10px',
                transition: 'background-color 0.3s',
              }}
              onClick={() => handleStartTask(task)}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#45a049')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#4caf50')}
            >
              Start Task
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
