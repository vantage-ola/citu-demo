import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import LoginPage from './pages/authform/LoginPage';
import SignupPage from './pages/authform/SignupPage';
import DashboardPage from './pages/DashboardPage';
import SpeakerDirectoryPage from './pages/speakers/SpeakerDirectoryPage';
import GroupManagementPage from './pages/groups/GroupManagementPage';
import EventManagementPage from './pages/events/EventManagementPage';
import SpeakerProfilePage from './pages/speakers/SpeakerProfilePage';
import EventDetailPage from './pages/events/EventDetailPage';
import PaymentPage from './pages/payments/PaymentPage';
import UserProfilePage from './pages/users/UserProfilePage';
import GroupDetailPage from './pages/groups/GroupDetailPage';
import SpeakerAvailabilityPage from './pages/speakers/SpeakerAvailabilityPage';

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
          <Route path="/available" element={<SpeakerAvailabilityPage/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
