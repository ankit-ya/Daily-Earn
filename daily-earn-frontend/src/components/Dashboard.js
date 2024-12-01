import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import Home from './Home'; // Import the Home component
import './Dashboard.css'; // Import the styles

const Dashboard = () => {
  const { userData, loading, error } = useContext(UserContext);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="dashboard-container">
      {/* User-specific content */}
      <section className="user-dashboard">
        <h2 className="welcome-message">
          Welcome <span>{userData?.username || "User"}</span>!
        </h2>
        <p className="welcome-description">
          At Daily Earn, every small step brings you closer to your financial goals.{" "}
          <strong>Complete tasks, earn coins, and cash out with ease!</strong>{" "}
          Let’s make today a productive one!
        </p>
        <p className="coin-balance">You have {userData?.coins || 0} coins.</p>
      </section>

      {/* Home content */}
      <Home />
    </div>
  );
};

export default Dashboard;
