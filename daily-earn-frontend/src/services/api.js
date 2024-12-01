import axios from 'axios';

 // Updated API URLconst
 const API_URL = 'http://localhost:5000/api';
// Correcting login API call with API_URL
export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response;
};

export const registerUser = async (username, email, password, isAdmin) => {
  const response = await axios.post(`${API_URL}/register`, { username, email, password, isAdmin });
  return response;
};



// In frontend (services/api.js)
// Admin Login
export const adminLogin = async (email, password) => {
  const response = await axios.post(`${API_URL}/admin/login`, { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token); // Store the token
  }
  return response;
};



// Admin Registration
export const adminRegister = async (username, email, password, secret) => {
  const response = await axios.post(`${API_URL}/admin/register`, { username, email, password, secret });
  return response;
};


 //New function to fetch notifications
 export const fetchNotifications = async (token) => {
  try {
      const response = await axios.get(`${API_URL}/notifications`, {
          headers: {
             'x-auth-token': token // Use the token passed as a parameter
          },
      });
      return response.data; // Return the notifications data
  } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error; // Rethrow to handle in the component
  }
};




// Admin: Send notification
// New function to send admin notification
export const sendAdminNotification = async (token, message) => {
  try {
    const response = await axios.post(`${API_URL}/send-notification`, { message }, {
      headers: { 'x-auth-token': token },
    });
    return response.data;
  } catch (error) {
    console.error('Error sending notification:', error);
    throw error; // Rethrow to handle in the component
  }
};



// Correcting other API calls with API_URL
export const fetchUserData = async (token) => {
  const response = await axios.get(`${API_URL}/user`, {
    headers: { 'x-auth-token': token },
  });
  return response;
};
export const convertCoins = async (token, coinsToConvert) => {
  return await axios.post(`${API_URL}/convert`, { coinsToConvert }, {
      headers: { 'x-auth-token': token },
  });
};


// New API call for fetching the withdrawal history
export const fetchWithdrawals = async (token) => {
  return await axios.get(`${API_URL}/withdrawals`, {
    headers: { 'x-auth-token': token },
  });
};

// New API call for updating withdrawal status
export const updateWithdrawalStatus = async (token, withdrawId, status) => {
  return await axios.put(`${API_URL}/withdraw/${withdrawId}/status`, { status }, {
    headers: { 'x-auth-token': token },
  });
};


export const fetchTransactionHistory = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/transaction-history`, {
      headers: { 'x-auth-token': token },
    });
    return response; // Return the response object.
  } catch (error) {
    console.error('Error fetching transaction history:', error.response || error);
    throw error; // Throw the error for handling in TransactionHistory.js.
  }
};


// Fetch Earnings
export const fetchEarnings = async (token) => {
  return await axios.get(`${API_URL}/earnings`, {
    headers: { 'x-auth-token': token },
  });
};

//user update profile 
export const updateUserData = async (data, token) => {
  try {
    const response = await axios.put(`${API_URL}/user`, data, {
      headers: { 'x-auth-token': token },
    });
    return response.data; // Adjust based on your response structure
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error; // Rethrow to handle in the component
  }
};



// Function to submit feedback
export const submitFeedback = async (feedback,email) => {
  try {
    const response = await fetch(`${API_URL}/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ feedback,email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to submit feedback');
    }

    return data; // Return success message
  } catch (error) {
    throw new Error(error.message || 'Server error, please try again later.');
  }
};

// Function to retrieve all feedback (for admin)
export const getFeedbacks = async () => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch feedback');
    }

    return data; // Return list of feedback
  } catch (error) {
    throw new Error(error.message || 'Server error, please try again later.');
  }
};


export const getUserReferralInfo = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/referral-info`, {
      method: 'GET',
      headers: { 'x-auth-token': token },
  });

  if (!response.ok) {
      throw new Error('Failed to fetch referral info');
  }

  return response.json();
};

export const updateReferralRewards = async (userId, rewardAmount) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/update-rewards`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
           'x-auth-token': token ,  // Change here
      },
      body: JSON.stringify({ userId, rewardAmount }),
  });

  if (!response.ok) {
      throw new Error('Failed to update rewards');
  }

  return response.json();
};


//for testing purpose 
export const requestWithdrawal = async (token, amount) => {
  return await axios.post(`${API_URL}/withdraw`, { amount }, {
    headers: { 'x-auth-token': token },
  });
};

export const verifyWithdrawal = async (token, verificationCode) => {
  return await axios.post(`${API_URL}/verify-withdrawal`, { verificationCode }, {
    headers: { 'x-auth-token': token },
  });
};

export const initiateRazorpayWithdrawal = async (token, amount) => {
  try {
    const response = await axios.post(`${API_URL}/withdraw`, { amount }, {
      headers: { 'x-auth-token': token },
    });
    const { order } = response.data;

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Use your Razorpay key ID
      amount: order.amount,
      currency: order.currency,
      name: 'Your App Name',
      description: 'Withdrawal Request',
      order_id: order.id,
      handler: async (response) => {
        const verifyResponse = await verifyRazorpayPayment(token, response);
        if (verifyResponse.success) {
          alert('Payment verified successfully!');
        }
      },
      prefill: {
        name: 'Your User Name',
        email: 'user@example.com',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error('Error initiating withdrawal:', error);
  }
};

// Add this function to verify payment after success
export const verifyRazorpayPayment = async (token, paymentData) => {
  try {
    const response = await axios.post(`${API_URL}/verify-payment`, paymentData, {
      headers: { 'x-auth-token': token },
    });
    return response.data;
  } catch (error) {
    console.error('Error verifying Razorpay payment:', error);
    throw error;
  }
};

export const submitTask = async (taskId, token) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/tasks/submit/${taskId}`,
      {},
      {
        headers: { 'x-auth-token': token },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Task submission failed');
  }
}; 

export const getWithdrawalRequests = async (token) => {
  try {
      const response = await axios.get(`${API_URL}/withdrawals/admin/requests`, {
          headers: { 'x-auth-token': token },
      });
      return response.data;
  } catch (error) {
      throw error;
  }
};

export const submitWithdrawalRequest = async (token, amount,upiId) => {
  try {
      const data = { amount , upiId,};
      const response = await axios.post(`${API_URL}/withdrawals/request`, data, {
          headers: { 'x-auth-token': token },
      });
      return response.data;
  } catch (error) {
      throw error;
  }
};





export const completeWithdrawalRequest = async (requestId, token) => {
  try {
      const response = await axios.post(
          `${API_URL}/withdrawals/admin/update`,
          { requestId, action: 'approve' },  // Assuming you're approving
          { headers: { 'x-auth-token': token } }
      );
      return response.data;
  } catch (error) {
      throw error;
  }
};





