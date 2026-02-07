/**
 * Main App Component
 * 
 * GREEN CODING PRINCIPLES:
 * - Efficient authentication state management
 * - Routes only render when needed
 * - Protected routes prevent unauthorized access
 * - Clean component structure with minimal overhead
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { ThemeProvider } from './context/ThemeContext';

// Components
import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/Chat';
import Navbar from './components/Navbar';

// Import styles
import './App.css';

function App() {
    // GREEN CODING: Single state for authentication
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    /**
     * Monitor Authentication State
     * GREEN CODING: Firebase listener set up ONCE on component mount
     * Automatically cleans up on component unmount
     */
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        // Cleanup listener on unmount - prevents memory leaks
        return () => unsubscribe();
    }, []);

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading MaVi GPT...</p>
            </div>
        );
    }

    return (
        <ThemeProvider>
            <Router>
                <div className="app">
                    {user && <Navbar user={user} />}

                    <Routes>
                        {/* Public Routes */}
                        <Route
                            path="/login"
                            element={user ? <Navigate to="/chat" /> : <Login />}
                        />
                        <Route
                            path="/register"
                            element={user ? <Navigate to="/chat" /> : <Register />}
                        />

                        {/* Protected Route */}
                        <Route
                            path="/chat"
                            element={user ? <Chat user={user} /> : <Navigate to="/login" />}
                        />

                        {/* Default Route */}
                        <Route
                            path="/"
                            element={<Navigate to={user ? "/chat" : "/login"} />}
                        />
                    </Routes>
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App;
