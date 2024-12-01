import React, { useState } from 'react';
import axios from 'axios';

const ConvertCoins = ({ userData, updateCoins }) => {
    const [coinsToConvert, setCoinsToConvert] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [updatedBalance, setUpdatedBalance] = useState(null);  // Corrected state declaration

    const handleConvert = async (e) => {
        e.preventDefault();
    
        const coins = parseInt(coinsToConvert, 10);
    
        if (coins <= 0 || isNaN(coins)) {
            setError('Please enter a valid number of coins.');
            return;
        }
    
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('You must be logged in to convert coins.');
                return;
            }
    
            const response = await axios.post(
                'http://localhost:5000/api/convert',
                { coinsToConvert: coins },
                { headers: { 'x-auth-token': token } }
            );
            console.log("Response from backend:", response.data);
            // Update both coins and balance
            updateCoins(response.data.updatedCoins); // Update coins state
            setUpdatedBalance(response.data.updatedBalance); // Update the balance state
            setMessage(`Coins converted successfully: ₹${response.data.amountInRupees}`);
            setError('');
            setCoinsToConvert('');
        } catch (err) {
            setError(err.response ? err.response.data.msg : 'Error converting coins.');
        }
    };
    

    return (
        <div>
            <h2>Convert Coins</h2>
            <form onSubmit={handleConvert}>
                <input
                    type="number"
                    value={coinsToConvert}
                    onChange={(e) => setCoinsToConvert(e.target.value)}
                    placeholder="Enter coins to convert (100 coins = ₹1)"
                    required
                />
                <button type="submit">Convert</button>
            </form>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            {/* Display updated balance after successful conversion */}
            {updatedBalance !== null && (
                <p>Updated Balance: ₹{updatedBalance.toFixed(2)}</p>
            )}
        </div>
    );
};

export default ConvertCoins;
