import React, { useEffect, useState } from 'react';
import { fetchUserData, updateUserData } from '../services/api'; // Import your API functions

const MyProfile = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const loadUserData = async () => {
            const token = localStorage.getItem('token'); // Retrieve the token
            try {
                const data = await fetchUserData(token); // Pass the token to the API call
                setUsername(data.username);
                setPassword(''); // Don't show the password for security reasons
            } catch (error) {
                setError('Failed to fetch user data');
            }
        };

        loadUserData();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // Retrieve the token
        try {
            await updateUserData({ username, password }, token); // Pass the token to the API call
            setSuccess('Profile updated successfully!');
            setError(''); // Clear previous error message
        } catch (error) {
            setError('Failed to update profile');
            setSuccess('');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>My Profile</h2>
            {error && <p style={styles.error}>{error}</p>}
            {success && <p style={styles.success}>{success}</p>}
            <form onSubmit={handleUpdate} style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Leave blank if you don't want to change"
                        style={styles.input}
                    />
                </div>
                <button type="submit" style={styles.button}>Update Profile</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        padding: '30px',
        maxWidth: '500px',
        margin: '50px auto',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        textAlign: 'center',
        fontSize: '2rem',
        color: '#333',
        marginBottom: '20px',
    },
    error: {
        color: '#ff4d4d',
        textAlign: 'center',
        fontSize: '1rem',
        marginBottom: '15px',
    },
    success: {
        color: '#4caf50',
        textAlign: 'center',
        fontSize: '1rem',
        marginBottom: '15px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        fontSize: '1rem',
        color: '#555',
        marginBottom: '8px',
    },
    input: {
        padding: '10px',
        fontSize: '1rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
        outline: 'none',
        backgroundColor: '#f4f4f4',
        transition: 'border 0.3s ease, background-color 0.3s ease',
    },
    inputFocus: {
        borderColor: '#007bff',
        backgroundColor: '#e6f7ff',
    },
    button: {
        backgroundColor: '#4caf50',
        color: '#fff',
        padding: '12px',
        fontSize: '1rem',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        fontWeight: 'bold',
    },
    buttonHover: {
        backgroundColor: '#45a049',
    },
};

export default MyProfile;
