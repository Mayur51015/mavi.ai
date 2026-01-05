/**
 * Register Component
 * 
 * GREEN CODING PRINCIPLES:
 * - Minimal state management
 * - Firebase handles user creation - no custom backend
 * - Registration happens only on user action
 * - Lightweight UI
 */

import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    // GREEN CODING: Minimal state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    /**
     * Handle Registration
     * GREEN CODING: User creation triggered ONLY on explicit action
     */
    const handleRegister = async (e) => {
        e.preventDefault();

        // Input validation to prevent unnecessary API calls
        if (!email || !password || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Firebase Auth - single API call
            await createUserWithEmailAndPassword(auth, email, password);
            // Redirect to chat after successful registration
            navigate('/chat');
        } catch (err) {
            setError(err.message || 'Failed to register');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>MaVi GPT</h1>
                <h2>Register</h2>

                <form onSubmit={handleRegister}>
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
                            placeholder="Enter your password (min 6 characters)"
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your password"
                            disabled={loading}
                            required
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" disabled={loading} className="btn-primary">
                        {loading ? 'Creating Account...' : 'Register'}
                    </button>
                </form>

                <p className="auth-switch">
                    Already have an account? <a href="/login">Login</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
