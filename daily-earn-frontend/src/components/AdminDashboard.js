import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { fetchUserData } from '../services/api'; // Adjust the import path accordingly
import AdminWithdrawals from './AdminWithdrawals'; // Import the separate withdrawals component

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Define the API_BASE_URL

const categories = ["Data Entry", "Surveys", "Content Writing", "Reading Stories"]; // Sample categories

const AdminDashboard = () => {
    const [withdrawals, setWithdrawals] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]); // State to hold feedback data
    const [taskList, setTaskList] = useState([{ title: '', description: '', reward: '', category: '' }]); // Support multiple tasks
    const [editingTaskId, setEditingTaskId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        fetchUserData(token)
            .then((res) => {
                if (!res.data.isAdmin) {
                    navigate('/'); // Redirect if not admin
                }
                fetchWithdrawals(token); // Fetch withdrawals
                fetchTasks(token); // Fetch tasks
                fetchFeedbacks(token); // Fetch feedback data
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
                navigate('/login');
            });
    }, [navigate]);

    const fetchWithdrawals = async (token) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/withdrawals`, {
                headers: { 'x-auth-token': token }
            });
            setWithdrawals(response.data);
        } catch (error) {
            console.error('Error fetching withdrawals', error);
        }
    };

    const fetchTasks = async (token) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/tasks`, {
                headers: { 'x-auth-token': token }
            });
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks', error);
        }
    };

    const fetchFeedbacks = async (token) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/feedback`, {
                headers: { 'x-auth-token': token }
            });
            setFeedbacks(response.data); // Update state with feedback data
        } catch (error) {
            console.error('Error fetching feedbacks', error);
        }
    };

    const handleWithdrawalStatus = async (id, status) => {
        try {
            await axios.put(`${API_BASE_URL}/withdrawals/${id}`, { status }, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            alert('Withdrawal status updated!');
            fetchWithdrawals(localStorage.getItem('token')); // Refresh withdrawals list
        } catch (error) {
            console.error(error);
            alert('Error updating withdrawal status');
        }
    };

    const handleTaskChange = (index, e) => {
        const { name, value } = e.target;
        const updatedTasks = [...taskList];
        updatedTasks[index][name] = value;
        setTaskList(updatedTasks);
    };

    const handleCategoryChange = (index, e) => {
        const updatedTasks = [...taskList];
        updatedTasks[index].category = e.target.value;
        setTaskList(updatedTasks);
    };

    const addNewTaskRow = () => {
        setTaskList([...taskList, { title: '', description: '', reward: '', category: '' }]);
    };
    
    const addOrUpdateTasks = async () => {
        const token = localStorage.getItem('token');
        try {
            if (editingTaskId) {
                // Update a single task (edit mode)
                await axios.put(`${API_BASE_URL}/tasks/${editingTaskId}`, taskList[0], {
                    headers: { 'x-auth-token': token }
                });
                alert('Task updated!');
                setEditingTaskId(null);
            } else {
                // Add tasks in bulk
                await axios.post(`${API_BASE_URL}/tasks/bulk`, { tasks: taskList }, {
                    headers: { 'x-auth-token': token }
                });
                alert('Tasks added!');
            }
    
            // Reset taskList and refresh tasks
            setTaskList([{ title: '', description: '', reward: '', category: '' }]);
            fetchTasks(token); // Call the function to refresh the task list
    
        } catch (error) {
            console.error('Error adding/updating tasks:', error);
            alert('Error adding/updating tasks');
        }
    };
    
    const editTask = (task) => {
        setTaskList([task]); // Edit single task
        setEditingTaskId(task._id);
    };

    const deleteTask = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`${API_BASE_URL}/tasks/${id}`, {
                headers: { 'x-auth-token': token }
            });
            alert('Task deleted!');
            fetchTasks(token); // Refresh tasks list
        } catch (error) {
            console.error(error);
            alert('Error deleting task');
        }
    };

    return (
        <div>
            {/* Admin Navbar */}
            <nav style={{ backgroundColor: '#333', color: 'white', padding: '10px' }}>
                <ul style={{ display: 'flex', listStyle: 'none', gap: '20px' }}>
                    <li><Link to="/admin" style={{ color: 'white' }}>Dashboard</Link></li>
                    <li><Link to="/admin/notifications" style={{ color: 'white' }}>Send Notification</Link></li>
                    <li><Link to="/admin/withdrawals" style={{ color: 'white' }}>Withdrawals</Link></li>
                    <li><Link to="/admin/tasks" style={{ color: 'white' }}>Manage Tasks</Link></li>
                    <li><Link to="/admin/feedbacks" style={{ color: 'white' }}>View Feedback</Link></li>
                </ul>
            </nav>

            <h1>Admin Dashboard</h1>

            {/* Withdrawal Section */}
            <h2>Withdrawal Requests</h2>
            <ul>
                {withdrawals.map((withdrawal) => (
                    <li key={withdrawal._id}>
                        {withdrawal.user} - ${withdrawal.amount}
                        <button onClick={() => handleWithdrawalStatus(withdrawal._id, 'approved')}>Approve</button>
                        <button onClick={() => handleWithdrawalStatus(withdrawal._id, 'rejected')}>Reject</button>
                    </li>
                ))}
            </ul>

            {/* Task Management Section */}
            <h2>Manage Tasks</h2>
            {taskList.map((task, index) => (
                <div key={index} style={{ marginBottom: '20px' }}>
                    <input
                        type="text"
                        name="title"
                        value={task.title}
                        onChange={(e) => handleTaskChange(index, e)}
                        placeholder="Task Title"
                    />
                    <textarea
                        name="description"
                        value={task.description}
                        onChange={(e) => handleTaskChange(index, e)}
                        placeholder="Task Description"
                    />
                    <input
                        type="number"
                        name="reward"
                        value={task.reward}
                        onChange={(e) => handleTaskChange(index, e)}
                        placeholder="Reward"
                    />
                    <select
                        value={task.category}
                        onChange={(e) => handleCategoryChange(index, e)}
                    >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            ))}
            <button onClick={addNewTaskRow}>Add Another Task</button>
            <button onClick={addOrUpdateTasks}>
                {editingTaskId ? 'Update Task' : 'Submit All Tasks'}
            </button>

            {/* Current Tasks */}
            <h2>Current Tasks</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>
                        {task.title} - {task.description} - ${task.reward} - {task.category}
                        <button onClick={() => editTask(task)}>Edit</button>
                        <button onClick={() => deleteTask(task._id)}>Delete</button>
                    </li>
                ))}
            </ul>

            {/* Feedback Section */}
            <h2>User Feedback</h2>
            <ul>
                {feedbacks.map((feedback) => (
                    <li key={feedback._id}>
                        <p><strong>Email:</strong> {feedback.email}</p>
                        <p><strong>Feedback:</strong> {feedback.feedback}</p>
                        <p><strong>Date:</strong> {new Date(feedback.createdAt).toLocaleString()}</p>
                    </li>
                ))}
            </ul>

            
            {/* Withdrawals Section */}
            <AdminWithdrawals /> {/* Render the AdminWithdrawals component */}
        </div>
    );
};

export default AdminDashboard;
