import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client'; // Import socket.io-client

const API_URL = 'http://localhost:5000/api'; // Your API base URL
const socket = io('http://localhost:5000'); // Connect to the WebSocket server

const AdminNotification = () => {
    const [message, setMessage] = useState('');
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Listen for new notifications from the WebSocket
        socket.on('notification', (notification) => {
            setNotifications((prevNotifications) => [notification, ...prevNotifications]);
        });

        // Cleanup when the component unmounts
        return () => {
            socket.off('notification');
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // Admin token
        console.log('Admin token:', token); // Log token to verify

        try {
            // Send the notification via API
            await axios.post(`${API_URL}/send-notification`, { message }, {
                headers: {
                    'x-auth-token': token,
                },
            });
            setMessage(''); // Clear message after sending
            alert('Notification sent successfully!');
        } catch (error) {
            console.error('Error sending notification:', error);
            alert(error.response?.data?.error || 'Error sending notification');
        }
    };

    return (
        <div>
            <h2>Admin Notification</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your notification here"
                    required
                />
                <button type="submit">Send Notification</button>
            </form>

            {/* Display notifications */}
            <h3>Notifications</h3>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>
                        {notification.message} - {new Date(notification.date).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminNotification;
