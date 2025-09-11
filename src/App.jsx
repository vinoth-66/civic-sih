// Main App component with React Router setup
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from './components/Toast';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Citizen Pages
import Login from './pages/citizen/Login';
import Register from './pages/citizen/Register';
import ReportIssue from './pages/citizen/ReportIssue';
import MyReports from './pages/citizen/MyReports';
import TrackStatus from './pages/citizen/TrackStatus';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/Dashboard';
import Analytics from './pages/admin/Analytics';

// Landing Page Component
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-8">
            Report.<span className="text-blue-600">Track.</span>Resolve.
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Your voice matters in building better communities. Report civic issues, 
            track their progress, and work together with local authorities for effective solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <a
              href="/login"
              className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              Get Started as Citizen
            </a>
            <a
              href="/admin/login"
              className="px-8 py-4 bg-gray-800 text-white text-lg font-semibold rounded-lg hover:bg-gray-900 transition-colors shadow-lg"
            >
              Admin Access
            </a>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Reporting</h3>
              <p className="text-gray-600">
                Report civic issues with just a few clicks. Add photos, location, and detailed descriptions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Tracking</h3>
              <p className="text-gray-600">
                Track the progress of your reported issues from submission to resolution with detailed timelines.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Impact</h3>
              <p className="text-gray-600">
                Work together with local authorities and fellow citizens to create positive change in your community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Citizen Protected Routes */}
            <Route
              path="/citizen/dashboard"
              element={
                <ProtectedRoute requiredRole="citizen">
                  <MyReports />
                </ProtectedRoute>
              }
            />
            <Route
              path="/citizen/report"
              element={
                <ProtectedRoute requiredRole="citizen">
                  <ReportIssue />
                </ProtectedRoute>
              }
            />
            <Route
              path="/citizen/track/:id"
              element={
                <ProtectedRoute requiredRole="citizen">
                  <TrackStatus />
                </ProtectedRoute>
              }
            />
            <Route
              path="/citizen/track"
              element={
                <ProtectedRoute requiredRole="citizen">
                  <MyReports />
                </ProtectedRoute>
              }
            />

            {/* Admin Protected Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/analytics"
              element={
                <ProtectedRoute requiredRole="admin">
                  <Analytics />
                </ProtectedRoute>
              }
            />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          
          {/* Toast Notifications */}
          <ToastContainer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;