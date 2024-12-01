import React, { useState, useEffect, useContext } from 'react';
import { verifyWithdrawal } from '../services/api';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';
import ConvertCoins from '../components/ConvertCoins';

const Withdraw = () => {
    const { userData, updateCoins } = useContext(UserContext);
    const [verificationCode, setVerificationCode] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [balance, setBalance] = useState(0);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch balance from the backend
    useEffect(() => {
        if (userData) {
            setBalance(userData.totalEarnings || 0);
            setLoading(false);
        }
    }, [userData]);

    const handleVerifyCode = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await verifyWithdrawal(token, { verificationCode });
            setMessage('Withdrawal successful.');
            resetForm();
        } catch (err) {
            setError('Invalid or expired verification code.');
        }
    };

    const handleConvert = async (coinsToConvert) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('You must be logged in to convert coins.');
                return;
            }

            const response = await axios.post(
                'http://localhost:5000/api/convert',
                { coinsToConvert },
                {
                    headers: { 'x-auth-token': token },
                }
            );

            setBalance(response.data.updatedBalance);
            setMessage(`Coins converted successfully: ₹${response.data.amountInRupees}`);
            setError('');
        } catch (err) {
            setError(err.response ? err.response.data.msg : 'Error converting coins.');
        }
    };

    const resetForm = () => {
        setVerificationCode('');
        setIsCodeSent(false);
    };

    const containerStyle = {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
    };

    const buttonStyle = {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '16px',
        marginTop: '10px',
        transition: 'background-color 0.3s ease',
    };

    const buttonHoverStyle = {
        ...buttonStyle,
        backgroundColor: '#0056b3',
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '16px',
        transition: 'border-color 0.3s ease',
    };

    const inputFocusStyle = {
        ...inputStyle,
        borderColor: '#007bff',
    };

    return (
        <div style={containerStyle}>
            <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Withdraw</h2>
            {loading ? (
                <p style={{ textAlign: 'center', color: '#777' }}>Loading...</p>
            ) : (
                <div>
                    <p style={{ fontSize: '18px', color: '#444' }}>
                        <strong>Your Available Coins:</strong> {userData?.coins || 0}
                    </p>
                    <p style={{ fontSize: '18px', color: '#444' }}>
                        <strong>Your Balance:</strong> ₹{balance}
                    </p>
                </div>
            )}
            <button
                style={buttonStyle}
                onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
                onClick={() => handleConvert(100)}
            >
                Convert 100 Coins
            </button>
            {userData && (
                <div style={{ marginTop: '20px' }}>
                    <ConvertCoins userData={userData} updateCoins={updateCoins} setUpdatedBalance={setBalance} />
                </div>
            )}
            {isCodeSent && (
                <form
                    onSubmit={handleVerifyCode}
                    style={{
                        marginTop: '20px',
                        animation: 'fadeIn 0.5s',
                    }}
                >
                    <h3 style={{ color: '#333' }}>Enter Verification Code</h3>
                    <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        placeholder="Verification Code"
                        required
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = inputFocusStyle.borderColor)}
                        onBlur={(e) => (e.target.style.borderColor = inputStyle.borderColor)}
                    />
                    <button
                        type="submit"
                        style={buttonStyle}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
                    >
                        Verify & Withdraw
                    </button>
                </form>
            )}
            {message && <p style={{ color: 'green', textAlign: 'center', marginTop: '20px' }}>{message}</p>}
            {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{error}</p>}
        </div>
    );
};

export default Withdraw;
