// src/contexts/UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import { fetchUserData } from '../services/api';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState({ coins: 0, username: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No token found. Please log in.');
                const response = await fetchUserData(token);
                setUserData({
                    coins: response.data.coins, // Update based on API response
                    username: response.data.username,
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const updateCoins = (newCoins) => {
        setUserData((prev) => ({ ...prev, coins: newCoins }));
    };

    return (
        <UserContext.Provider value={{ userData, updateCoins, loading, error }}>
            {children}
        </UserContext.Provider>
    );
};
