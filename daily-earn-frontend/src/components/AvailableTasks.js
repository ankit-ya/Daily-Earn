import React, { useState, useEffect } from 'react';

const AvailableTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from the JSONPlaceholder API
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => setTasks(data.slice(0, 10))) // Fetch only first 10 tasks
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  return (
    <div className="available-tasks">
      <h2>Available Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className="task-card">
            <h3>{task.title}</h3>
            <p>Status: {task.completed ? 'Completed' : 'Pending'}</p>
            <button>Start Task</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvailableTasks;