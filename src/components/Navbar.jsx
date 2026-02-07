/**
 * Navbar Component
 * 
 * GREEN CODING PRINCIPLES:
 * - Minimal, lightweight component
 * - No heavy assets or animations
 * - Authentication state managed efficiently
 */

import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar = ({ user }) => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    /**
     * Handle Logout
     * GREEN CODING: Clean session termination - no memory leaks
     */
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <h1>MaVi GPT</h1>
                <span className="navbar-subtitle">AI for Engineering Students</span>
            </div>

            <div className="navbar-actions">
                {user && (
                    <>
                        <span className="user-email">{user.email}</span>
                        <button onClick={toggleTheme} className="btn-theme-toggle" title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
                            {theme === 'dark' ? '☀️' : '🌙'}
                        </button>
                        <button onClick={handleLogout} className="btn-secondary">
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
