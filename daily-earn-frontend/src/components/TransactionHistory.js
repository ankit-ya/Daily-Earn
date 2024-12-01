import React, { useEffect, useState } from 'react';
import { fetchTransactionHistory } from '../services/api';

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const getTransactions = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No token found, please login again.');
                return;
            }

            try {
                const response = await fetchTransactionHistory(token);
                setTransactions(response.data); // Ensure this is an array of transactions.
            } catch (err) {
                console.error('Error in TransactionHistory:', err);
                setError(err.response ? err.response.data.error || err.response.data.msg : 'Server error');
            }
        };

        getTransactions();
    }, []);

    const containerStyle = {
        maxWidth: '800px',
        margin: '20px auto',
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        animation: 'fadeIn 0.5s ease-in-out',
    };

    const headingStyle = {
        textAlign: 'center',
        color: '#333',
        marginBottom: '20px',
        fontSize: '24px',
    };

    const transactionCardStyle = {
        backgroundColor: '#fff',
        padding: '15px',
        margin: '10px 0',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    };

    const transactionCardHoverStyle = {
        ...transactionCardStyle,
        transform: 'scale(1.02)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
    };

    const transactionTextStyle = {
        margin: '5px 0',
        color: '#555',
        fontSize: '16px',
    };

    const errorStyle = {
        textAlign: 'center',
        color: 'red',
        fontSize: '18px',
        margin: '20px 0',
    };

    const noTransactionStyle = {
        textAlign: 'center',
        color: '#777',
        fontSize: '18px',
        margin: '20px 0',
    };

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>Transaction History</h1>
            {error ? (
                <p style={errorStyle}>{error}</p>
            ) : transactions.length > 0 ? (
                transactions.map((txn) => (
                    <div
                        key={txn._id}
                        style={transactionCardStyle}
                        onMouseEnter={(e) => {
                            Object.assign(e.currentTarget.style, transactionCardHoverStyle);
                        }}
                        onMouseLeave={(e) => {
                            Object.assign(e.currentTarget.style, transactionCardStyle);
                        }}
                    >
                        <p style={transactionTextStyle}>
                            <strong>Type:</strong> {txn.type}
                        </p>
                        <p style={transactionTextStyle}>
                            <strong>Amount:</strong> ₹{txn.amount}
                        </p>
                        <p style={transactionTextStyle}>
                            <strong>Status:</strong>{' '}
                            <span
                                style={{
                                    color:
                                        txn.status === 'Completed'
                                            ? 'green'
                                            : txn.status === 'Pending'
                                            ? 'orange'
                                            : 'red',
                                }}
                            >
                                {txn.status}
                            </span>
                        </p>
                        <p style={transactionTextStyle}>
                            <strong>Date:</strong> {new Date(txn.date).toLocaleString()}
                        </p>
                    </div>
                ))
            ) : (
                <p style={noTransactionStyle}>No transactions found.</p>
            )}
        </div>
    );
};

export default TransactionHistory;
