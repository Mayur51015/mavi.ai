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

const Navbar = ({ user }) => {
    const navigate = useNavigate();

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
