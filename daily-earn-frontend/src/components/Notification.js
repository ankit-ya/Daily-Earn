import React, { useEffect, useState } from 'react';
import { fetchNotifications } from '../services/api'; // Import the refactored API function

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const loadNotifications = async () => {
            setLoading(true); // Set loading state to true before fetching
            try {
                const data = await fetchNotifications(token); // Use the imported function
                setNotifications(data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
                setError('Failed to load notifications. Please try again later.');
            } finally {
                setLoading(false); // Set loading state to false after fetching
            }
        };

        loadNotifications();
    }, []);

    if (loading) {
        return <div style={styles.loading}>Loading notifications...</div>; // Loading state message
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Notifications</h2>
            {error && <p style={styles.error}>{error}</p>} {/* Display error message if any */}
            <div style={styles.notificationsContainer}>
                {notifications.length > 0 ? (
                    notifications.map((notif) => (
                        <div key={notif._id} style={styles.notificationItem}>
                            <p style={styles.notificationMessage}>{notif.message}</p>
                            <span style={styles.notificationDate}>
                                {new Date(notif.date).toLocaleString()}
                            </span>
                        </div>
                    ))
                ) : (
                    <div style={styles.noNotifications}>No notifications available.</div> // Message when there are no notifications
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#f8f9fa', // Light background color for the container
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        margin: 'auto',
        fontFamily: 'Arial, sans-serif',
        overflow: 'hidden',
        animation: 'fadeIn 0.5s ease-out',
    },
    heading: {
        fontSize: '2rem',
        textAlign: 'center',
        color: '#007bff', // Bright blue color for heading
        marginBottom: '20px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '1px',
    },
    error: {
        color: '#ff4d4d', // Red for errors
        textAlign: 'center',
        marginBottom: '15px',
        fontSize: '1rem',
    },
    notificationsContainer: {
        maxHeight: '400px',
        overflowY: 'auto',
        paddingBottom: '20px',
    },
    notificationItem: {
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s ease, transform 0.3s ease',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#e1f7d5', // Light green background on hover
            transform: 'scale(1.05)',
        },
    },
    notificationMessage: {
        fontSize: '1.1rem',
        color: '#333',
        marginBottom: '5px',
        fontWeight: 'bold',
        wordWrap: 'break-word',
    },
    notificationDate: {
        fontSize: '0.9rem',
        color: '#888',
        marginLeft: '10px',
    },
    noNotifications: {
        textAlign: 'center',
        color: '#888',
        fontSize: '1rem',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#f0f0f0', // Light grey background for no notifications
    },
    loading: {
        textAlign: 'center',
        fontSize: '1.2rem',
        color: '#333',
    },
    '@keyframes fadeIn': {
        '0%': { opacity: 0 },
        '100%': { opacity: 1 },
    },
    '@media (max-width: 768px)': {
        container: {
            padding: '10px',
        },
        heading: {
            fontSize: '1.5rem',
        },
        notificationItem: {
            padding: '10px',
            fontSize: '0.9rem',
        },
        notificationMessage: {
            fontSize: '1rem',
        },
        noNotifications: {
            padding: '10px',
        },
    },
};

export default Notification;
