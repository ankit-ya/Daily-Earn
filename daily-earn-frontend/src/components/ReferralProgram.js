// src/components/ReferralProgram.js
import React, { useState, useEffect } from 'react';
import { sendAdminNotification as sendNotification } from '../services/api';
import { getUserReferralInfo, updateReferralRewards } from '../services/api'; // Mocked service functions to fetch and update referral info

const ReferralProgram = () => {
    const [referralCode, setReferralCode] = useState('');
    const [referralCount, setReferralCount] = useState(0);
    const [rewardsEarned, setRewardsEarned] = useState(0);
    const [referrals, setReferrals] = useState([]); // Holds list of referred users and their status

    // Fetch the referral information for the current user
    useEffect(() => {
        const fetchReferralInfo = async () => {
            try {
                const data = await getUserReferralInfo();
                setReferralCode(data.referralCode);
                setReferralCount(data.referralCount);
                setRewardsEarned(data.rewardsEarned);
                setReferrals(data.referredUsers); // Assuming the data has a referredUsers array
            } catch (error) {
                console.error('Error fetching referral info:', error);
            }
        };
        
        fetchReferralInfo();
    }, []);

    const handleReferralSuccess = async (referringUserId, rewardAmount) => {
        try {
            // Update the referring user's rewards in your backend
            await updateReferralRewards(referringUserId, rewardAmount);

            // Send a notification to the referring user
            await sendNotification(`You have earned ${rewardAmount} for a successful referral!`);
            alert('Notification sent successfully!');
        } catch (error) {
            console.error('Error sending notification:', error);
            alert('Failed to send notification. Please try again.');
        }
    }; 

    const copyReferralCode = () => {
        navigator.clipboard.writeText(referralCode);
        alert('Referral code copied to clipboard!');
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Referral Program</h2>
            
            <div style={styles.section}>
                <div style={styles.codeContainer}>
                    <strong>Your Referral Code:</strong>
                    <span style={styles.referralCode}>{referralCode}</span>
                    <button onClick={copyReferralCode} style={styles.copyButton}>Copy</button>
                </div>
            </div>

            <div style={styles.section}>
                <div style={styles.stats}>
                    <strong>Total Referrals:</strong> <span>{referralCount}</span>
                </div>
                <div style={styles.stats}>
                    <strong>Rewards Earned:</strong> <span>{rewardsEarned}</span>
                </div>
            </div>

            <h3 style={styles.subheading}>Your Referrals</h3>
            <ul style={styles.referralsList}>
                {referrals.length > 0 ? (
                    referrals.map((referral, index) => (
                        <li key={index} style={styles.referralItem}>
                            <span>{referral.username} - {referral.status}</span>
                            {referral.status === 'completed' && (
                                <button 
                                    onClick={() => handleReferralSuccess(referral.userId, 10)} 
                                    style={styles.rewardButton}
                                >
                                    Send Referral Reward
                                </button>
                            )}
                        </li>
                    ))
                ) : (
                    <li style={styles.noReferrals}>No referrals yet.</li>
                )}
            </ul>
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: '#f9f9f9',
        padding: '30px 20px',
        maxWidth: '900px',
        margin: '0 auto',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        textAlign: 'center',
        fontSize: '2rem',
        color: '#333',
        marginBottom: '20px',
        fontWeight: 'bold',
    },
    section: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    codeContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    referralCode: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        marginRight: '10px',
        color: '#007BFF',
    },
    copyButton: {
        padding: '6px 12px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    copyButtonHover: {
        backgroundColor: '#0056b3',
    },
    stats: {
        fontSize: '1.1rem',
        marginBottom: '10px',
    },
    subheading: {
        fontSize: '1.5rem',
        color: '#333',
        marginTop: '20px',
        marginBottom: '15px',
    },
    referralsList: {
        listStyleType: 'none',
        paddingLeft: '0',
    },
    referralItem: {
        padding: '10px',
        backgroundColor: '#fff',
        marginBottom: '10px',
        borderRadius: '6px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rewardButton: {
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        padding: '6px 12px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    noReferrals: {
        textAlign: 'center',
        fontStyle: 'italic',
        color: '#777',
    }
};

export default ReferralProgram;
