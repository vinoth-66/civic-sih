// Protected route component for role-based access
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { PageLoader } from './Loader';

const ProtectedRoute = ({ children, requiredRole = null, redirectTo = '/login' }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <PageLoader text="Checking authentication..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Check role-based access
  if (requiredRole && user?.role !== requiredRole) {
    // Redirect based on user role
    const roleRedirects = {
      admin: '/admin/dashboard',
      citizen: '/citizen/dashboard'
    };
    
    return <Navigate to={roleRedirects[user.role] || '/'} replace />;
  }

  return children;
};

export default ProtectedRoute;