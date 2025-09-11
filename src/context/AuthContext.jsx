import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for an existing session in local storage when the app loads
        const storedUser = localStorage.getItem('civic_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password, role = 'citizen') => {
        // We will implement the real login API call here later
        setLoading(true);
        try {
            // Dummy authentication logic for now
            const dummyUser = {
                id: role === 'admin' ? 2 : 1,
                name: role === 'admin' ? 'Admin User' : 'John Doe',
                email,
                role,
                token: 'dummy-jwt-token-' + Date.now()
            };

            setUser(dummyUser);
            localStorage.setItem('civic_user', JSON.stringify(dummyUser));
            return { success: true, user: dummyUser };
        } catch (error) {
            return { success: false, error: 'Login failed' };
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        setLoading(true);
        try {
            // This is the real API call to your backend's registration endpoint
            const response = await axios.post('/api/auth/register', userData);
            
            const newUser = response.data;
            // For now, we'll just create a dummy token after successful registration
            newUser.token = 'dummy-jwt-token-' + Date.now(); 

            setUser(newUser);
            localStorage.setItem('civic_user', JSON.stringify(newUser));
            
            return { success: true, user: newUser };
        } catch (error) {
            // Return the actual error message from the backend if available
            return { success: false, error: error.response?.data || 'Registration failed' };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('civic_user');
    };

    const value = {
        user,
        login,
        register,
        logout,
        loading,
        isAuthenticated: !!user,
        isCitizen: user?.role === 'citizen',
        isAdmin: user?.role === 'admin'
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};