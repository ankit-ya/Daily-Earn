import React, { useState } from 'react';

const CompletedTasks = () => {
  const [completedTasks] = useState([
    { id: 1, title: 'Task 1', completed: true },
    { id: 2, title: 'Task 2', completed: true },
    { id: 3, title: 'Task 3', completed: true },
  ]);

  return (
    <div className="completed-tasks">
      <h2>Completed Tasks</h2>
      <ul>
        {completedTasks.map(task => (
          <li key={task.id} className="task-card">
            <h3>{task.title}</h3>
            <p>Status: {task.completed ? 'Completed' : 'Pending'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompletedTasks