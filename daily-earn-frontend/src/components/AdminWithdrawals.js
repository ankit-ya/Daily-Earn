import React, { useEffect, useState } from 'react';
import { getWithdrawalRequests, completeWithdrawalRequest } from '../services/api';

const AdminWithdrawals = () => {
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchRequests = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await getWithdrawalRequests(token);
                console.log("Full Response:", response);  // Log the full response object to inspect it

                // Check if the response is an array
                if (Array.isArray(response)) {
                    setRequests(response);  // Set the response if it's an array
                } else {
                    setError('Unexpected response format or empty data.');
                }
            } catch (err) {
                setError('Failed to fetch withdrawal requests.');
                console.error(err);
            }
        };

        fetchRequests();
    }, []);

    const handleCompleteRequest = async (requestId) => {
        const token = localStorage.getItem('token');
        try {
            await completeWithdrawalRequest(requestId, token);  // Pass token to API call
            setMessage('Withdrawal request completed successfully.');
            setRequests(requests.filter((req) => req._id !== requestId));  // Update state after completion
        } catch (err) {
            setError('Failed to complete withdrawal request.');
        }
    };

    return (
        <div className="admin-withdrawals">
            <h2>Pending Withdrawal Requests</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}
            <ul>
                {requests && requests.length > 0 ? (
                    requests.map((request) => (
                        <li key={request._id}>
                            <p>User: {request.user.username}</p>
                            <p>Amount: ₹{request.amount}</p>
                            <p>UPI ID: {request.upiId}</p> {/* Display UPI ID */}
                            <button onClick={() => handleCompleteRequest(request._id)}>
                                Complete
                            </button>
                        </li>
                    ))
                ) : (
                    <p>No pending withdrawal requests.</p>
                )}
            </ul>
        </div>
    );
};

export default AdminWithdrawals;
