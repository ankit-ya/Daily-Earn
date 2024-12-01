import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; // Ensure global CSS for dark/light mode
import { UserProvider } from './contexts/UserContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AvailableTasks from './components/AvailableTasks';
import CompletedTasks from './components/CompletedTasks';
import TaskList from './components/TaskList';
import TotalEarn from './components/TotalEarn';
import Withdraw from './pages/Withdraw';
import Wallet from './pages/Wallet';
import TransactionHistory from './components/TransactionHistory';
import Leaderboard from './components/Leaderboard';
import AboutSection from './components/AboutSection';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import AdminRegister from './pages/AdminRegister';
import AdminNotification from './components/AdminNotification';
import Notification from './components/Notification';
import MyProfile from './components/MyProfile';
import Settings from './components/Settings';
import HelpSupport from './components/HelpSupport';
import ReferralProgram from './components/ReferralProgram';
import AdminFeedback from './components/AdminFeedback';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TaskInstructions from './pages/TaskInstructions';
import PerformTask from './pages/PerformTask';





function App() {
  return (
    <ThemeProvider>
      <UserProvider>
    <Router>
      <Navbar />
      <div>
        <Routes>
        
          {/* User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/available-tasks" element={<AvailableTasks />} />
          <Route path="/completed-tasks" element={<CompletedTasks />} />
          <Route path="/task-list" element={<TaskList />} />
          <Route path="/task-instructions" element={<TaskInstructions />} />
          <Route path="/perform-task/:type" element={<PerformTask />} />
          <Route path="/total-earn" element={<TotalEarn />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/transaction-history" element={<TransactionHistory />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/about" element={<AboutSection />} />
          <Route path='/notifications' element={<Notification/>}/>
          <Route path="/my-profile" element={<MyProfile/>}/>
           <Route path="/settings" element={<Settings />} />
           <Route path="/help" element={<HelpSupport />} />
           <Route path="/referral" element={<ReferralProgram/>}/>
           

          
          {/* Admin Route */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/notifications" element={<AdminNotification />} /> {/* Add this line */}
          <Route path="/admin/feedbacks" element={<AdminFeedback />} />
        </Routes>
      </div>
    </Router>
    </UserProvider>
    </ThemeProvider>
  );
}

export default App;
