import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminReferralManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [rewardAmount, setRewardAmount] = useState(0);

  // Fetch users with referral data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/admin/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  // Handle reward update
  const handleUpdateRewards = async () => {
    try {
      await axios.post('/admin/update-rewards', { userId: selectedUserId, rewardAmount });
      alert('Rewards updated successfully');
    } catch (error) {
      console.error('Error updating rewards:', error);
      alert('Failed to update rewards');
    }
  };

  return (
    <div>
      <h2>Admin Referral Management</h2>

      {/* User Referral List */}
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Referral Code</th>
            <th>Referred By</th>
            <th>Referral Count</th>
            <th>Rewards Earned</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.referralCode}</td>
              <td>{user.referredBy || 'N/A'}</td>
              <td>{user.referralCount}</td>
              <td>{user.rewardsEarned}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Adjust Rewards Form */}
      <div>
        <h3>Adjust Rewards</h3>
        <label>
          Select User:
          <select onChange={(e) => setSelectedUserId(e.target.value)}>
            <option value="">Select a user</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>
                {user.username}
              </option>
            ))}
          </select>
        </label>
        <label>
          Reward Amount:
          <input
            type="number"
            value={rewardAmount}
            onChange={(e) => setRewardAmount(Number(e.target.value))}
          />
        </label>
        <button onClick={handleUpdateRewards}>Update Rewards</button>
      </div>
    </div>
  );
};

export default AdminReferralManagement;
