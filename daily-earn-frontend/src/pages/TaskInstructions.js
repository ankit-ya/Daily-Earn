import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const TaskInstructions = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve task information passed via location state
  const task = location.state?.task || {
    title: 'Task',
    description: 'No specific task information available.',
  };

  const [readInstructions, setReadInstructions] = useState(false);

  // Toggle the continue button after reading instructions
  const handleContinue = () => {
    if (readInstructions) {
      console.log('Navigating to perform task with data:', task); // Debugging line
      navigate(`/perform-task/${task.type}`, { state: { task } });
    }
  };

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
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
        Task Instructions
      </h2>
      <p
        style={{
          fontSize: '16px',
          color: '#666',
          marginBottom: '20px',
        }}
      >
        Please read the instructions carefully. You will not earn rewards without completing the task.
      </p>
      <ul
        style={{
          textAlign: 'left',
          margin: '0 auto',
          padding: '0 20px',
          listStyleType: 'disc',
          fontSize: '16px',
          color: '#555',
        }}
      >
        <li>Follow all instructions carefully to ensure task approval.</li>
        <li>Maintain high quality and accuracy in your work.</li>
        <li>Complete the task within the designated time frame.</li>
        <li>Avoid using any automation or shortcuts.</li>
        <li>Double-check your work for errors before submission.</li>
        <li>Hold here 1 minute after reading the instructions.</li>
      </ul>

      <div
        style={{
          marginTop: '20px',
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#fff',
          textAlign: 'left',
        }}
      >
        <h3
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#333',
          }}
        >
          {task.title}
        </h3>
        <p
          style={{
            fontSize: '16px',
            color: '#666',
            marginTop: '10px',
          }}
        >
          {task.description}
        </p>
      </div>

      {/* Checkbox to acknowledge reading */}
      <label
        style={{
          display: 'block',
          marginTop: '20px',
          fontSize: '16px',
          color: '#555',
        }}
      >
        <input
          type="checkbox"
          onChange={() => setReadInstructions(!readInstructions)}
          checked={readInstructions}
          style={{
            marginRight: '10px',
          }}
        />
        I have read the instructions.
      </label>

      <button
        onClick={handleContinue}
        disabled={!readInstructions}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#fff',
          backgroundColor: readInstructions ? '#4caf50' : '#ccc',
          border: 'none',
          borderRadius: '5px',
          cursor: readInstructions ? 'pointer' : 'not-allowed',
          transition: 'background-color 0.3s',
        }}
        onMouseEnter={(e) =>
          readInstructions &&
          (e.target.style.backgroundColor = '#45a049')
        }
        onMouseLeave={(e) =>
          readInstructions &&
          (e.target.style.backgroundColor = '#4caf50')
        }
      >
        Continue
      </button>
    </div>
  );
};

export default TaskInstructions;
