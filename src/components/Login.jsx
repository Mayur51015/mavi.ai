/**
 * Login Component
 * 
 * GREEN CODING PRINCIPLES:
 * - Minimal state management (only email, password, error, loading)
 * - Firebase handles authentication - no custom backend needed
 * - Auth happens only on user action (form submission)
 * - Simple, lightweight UI with no heavy animations or images
 */

import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    // GREEN CODING: Minimal state - only what's necessary
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    /**
     * Handle Login
     * GREEN CODING: Authentication triggered ONLY on explicit user action
     */
    const handleLogin = async (e) => {
        e.preventDefault();

        // Input validation to prevent unnecessary API calls
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Firebase Auth - single API call, no retries unless network error
            await signInWithEmailAndPassword(auth, email, password);
            // Redirect to chat on successful login
            navigate('/chat');
        } catch (err) {
            setError(err.message || 'Failed to login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>MaVi GPT</h1>
                <h2>Login</h2>

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            disabled={loading}
                            required
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" disabled={loading} className="btn-primary">
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className="auth-switch">
                    Don't have an account? <a href="/register">Register</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
