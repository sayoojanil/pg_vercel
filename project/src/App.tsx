import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import GuestsPage from './components/GuestsPage';
import ReviewsPage from './components/ReviewsPage';
import RentPage from './components/RentPage';
import ProfilePage from './components/ProfilePage';

function AppContent() {
  const { user } = useAuth();

  if (!user) {
    return <LoginPage />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/guests" element={<GuestsPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/rent" element={<RentPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;