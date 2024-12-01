import React, { useState, useEffect } from "react";
import { fetchUserData, submitWithdrawalRequest } from "../services/api";

const Wallet = () => {
  const [balance, setBalance] = useState(0);
  const [amountToWithdraw, setAmountToWithdraw] = useState("");
  const [upiId, setUpiId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetching the balance
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }
        const response = await fetchUserData(token);
        setBalance(response.data.totalEarnings);
        setLoading(false);
      } catch (error) {
        setError(error.response ? error.response.data.msg : "Error fetching data");
        setLoading(false);
      }
    };
    fetchBalance();
  }, []);

  // Handle the withdrawal request
  const handleWithdraw = async (e) => {
    e.preventDefault();
    if (amountToWithdraw <= 0 || amountToWithdraw > balance) {
      setError("Invalid withdrawal amount.");
      return;
    }
    if (!upiId.trim()) {
      setError("Please enter a valid UPI ID.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await submitWithdrawalRequest(token, amountToWithdraw, upiId);
      setMessage("Withdrawal request sent to admin for approval.");
      setAmountToWithdraw("");
      setUpiId("");
      setError("");
    } catch (err) {
      setError("Error processing withdrawal request.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Wallet</h2>
      {loading ? (
        <p style={styles.loadingText}>Loading...</p>
      ) : error ? (
        <p style={styles.errorText}>{error}</p>
      ) : (
        <>
          <p style={styles.balanceText}>Your Balance: ₹{balance}</p>
          <form onSubmit={handleWithdraw} style={styles.form}>
            <input
              type="number"
              value={amountToWithdraw}
              onChange={(e) => setAmountToWithdraw(e.target.value)}
              placeholder="Enter amount to withdraw"
              required
              style={styles.input}
            />
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="Enter your UPI ID"
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button}>
              Request Withdrawal
            </button>
          </form>
          {message && <p style={styles.successMessage}>{message}</p>}
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Arial', sans-serif",
    animation: "fadeIn 1s ease-in-out",
  },
  heading: {
    fontSize: "1.8rem",
    color: "#333",
    textAlign: "center",
    marginBottom: "20px",
  },
  loadingText: {
    textAlign: "center",
    color: "#888",
    fontStyle: "italic",
  },
  errorText: {
    color: "#d9534f",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  balanceText: {
    fontSize: "1.2rem",
    color: "#4CAF50",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ddd",
    outline: "none",
    transition: "border-color 0.3s",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#007BFF",
    color: "#fff",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  successMessage: {
    color: "#28a745",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: "10px",
  },
  "@keyframes fadeIn": {
    "0%": { opacity: 0 },
    "100%": { opacity: 1 },
  },
};

export default Wallet;
