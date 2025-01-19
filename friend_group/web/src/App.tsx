import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import SpeakerDirectoryPage from './pages/SpeakerDirectoryPage';
import GroupManagementPage from './pages/GroupManagementPage';
import EventManagementPage from './pages/EventManagementPage';
import SpeakerProfilePage from './pages/SpeakerProfilePage';
import EventDetailPage from './pages/EventDetailPage';
import PaymentPage from './pages/PaymentPage';
import UserProfilePage from './pages/UserProfilePage';
import GroupDetailPage from './pages/GroupDetailPage';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/speakers" element={<SpeakerDirectoryPage />} />
          <Route path="/groups" element={<GroupManagementPage />} />
          <Route path="/groups/:id" element={<GroupDetailPage />} />
          <Route path="/events" element={<EventManagementPage />} />
          <Route path="/speakers/:id" element={<SpeakerProfilePage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />
          <Route path="/payments" element={<PaymentPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
