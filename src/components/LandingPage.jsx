/**
 * Landing Page Component
 * 
 * A stunning, creative landing page with glassmorphic design,
 * dynamic animations, and vibrant aesthetics
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

function LandingPage() {
    const { theme, toggleTheme } = useTheme();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);

        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const features = [
        {
            icon: '🚀',
            title: 'Lightning Fast',
            description: 'Get instant responses powered by Google Gemini AI with minimal latency'
        },
        {
            icon: '🎨',
            title: 'Beautiful Design',
            description: 'Experience a stunning glassmorphic interface with dark & light themes'
        },
        {
            icon: '🔒',
            title: 'Secure & Private',
            description: 'Your conversations are protected with Firebase authentication'
        },
        {
            icon: '🌍',
            title: 'Green Coding',
            description: 'Built with eco-friendly principles for minimal carbon footprint'
        },
        {
            icon: '💬',
            title: 'Natural Conversations',
            description: 'Chat naturally like talking to a real human assistant'
        },
        {
            icon: '⚡',
            title: 'Always Available',
            description: '24/7 availability - your AI companion never sleeps'
        }
    ];

    return (
        <div className="landing-page">
            {/* Animated Background */}
            <div
                className="landing-bg-gradient"
                style={{
                    '--mouse-x': `${mousePosition.x}%`,
                    '--mouse-y': `${mousePosition.y}%`
                }}
            />
            <div className="floating-orbs">
                <div className="orb orb-1" />
                <div className="orb orb-2" />
                <div className="orb orb-3" />
                <div className="orb orb-4" />
            </div>

            {/* Navigation */}
            <nav className="landing-nav">
                <div className="landing-nav-brand">
                    <span className="brand-icon">✨</span>
                    <span className="brand-text">MaVi GPT</span>
                </div>
                <div className="landing-nav-actions">
                    <button
                        className="btn-theme-toggle"
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                    >
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>
                    <Link to="/login" className="nav-link">Login</Link>
                    <Link to="/register" className="nav-btn-primary">Get Started</Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className={`hero-section ${isVisible ? 'visible' : ''}`}>
                <div className="hero-content">
                    <div className="hero-badge">
                        <span className="badge-dot" />
                        Powered by Google Gemini AI
                    </div>
                    <h1 className="hero-title">
                        Your Intelligent
                        <span className="gradient-text"> AI Companion</span>
                    </h1>
                    <p className="hero-description">
                        Experience the future of conversation with MaVi GPT.
                        Smart, intuitive, and beautifully designed to help you
                        accomplish more with the power of artificial intelligence.
                    </p>
                    <div className="hero-cta">
                        <Link to="/register" className="btn-hero-primary">
                            <span>Start Chatting Free</span>
                            <span className="btn-arrow">→</span>
                        </Link>
                        <Link to="/login" className="btn-hero-secondary">
                            <span>Sign In</span>
                        </Link>
                    </div>
                    <div className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-number">100%</span>
                            <span className="stat-label">Free to Use</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat-item">
                            <span className="stat-number">24/7</span>
                            <span className="stat-label">Available</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat-item">
                            <span className="stat-number">∞</span>
                            <span className="stat-label">Possibilities</span>
                        </div>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="chat-preview">
                        <div className="preview-header">
                            <div className="preview-dots">
                                <span className="dot red" />
                                <span className="dot yellow" />
                                <span className="dot green" />
                            </div>
                            <span className="preview-title">MaVi GPT</span>
                        </div>
                        <div className="preview-messages">
                            <div className="preview-msg user">
                                <p>Hello! Can you help me learn something new today?</p>
                            </div>
                            <div className="preview-msg ai">
                                <p>Of course! I'd love to help you explore new ideas. What topic interests you? 🌟</p>
                            </div>
                            <div className="preview-msg user">
                                <p>Tell me about the future of AI!</p>
                            </div>
                            <div className="preview-input">
                                <span className="typing-cursor" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="section-header">
                    <h2 className="section-title">
                        Why Choose <span className="gradient-text">MaVi GPT</span>?
                    </h2>
                    <p className="section-subtitle">
                        Discover the features that make MaVi GPT your perfect AI companion
                    </p>
                </div>
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="feature-card"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="feature-icon">{feature.icon}</div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-description">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How It Works */}
            <section className="how-it-works">
                <div className="section-header">
                    <h2 className="section-title">
                        How It <span className="gradient-text">Works</span>
                    </h2>
                    <p className="section-subtitle">
                        Get started in just three simple steps
                    </p>
                </div>
                <div className="steps-container">
                    <div className="step-card">
                        <div className="step-number">01</div>
                        <h3>Create Account</h3>
                        <p>Sign up for free in seconds with your email</p>
                    </div>
                    <div className="step-connector" />
                    <div className="step-card">
                        <div className="step-number">02</div>
                        <h3>Start Chatting</h3>
                        <p>Begin your conversation with MaVi GPT instantly</p>
                    </div>
                    <div className="step-connector" />
                    <div className="step-card">
                        <div className="step-number">03</div>
                        <h3>Enjoy AI Power</h3>
                        <p>Get intelligent responses to all your questions</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-card">
                    <h2>Ready to Experience the Future?</h2>
                    <p>Join thousands of users already chatting with MaVi GPT</p>
                    <Link to="/register" className="btn-cta">
                        Get Started for Free
                        <span className="sparkle">✨</span>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <div className="footer-content">
                    <div className="footer-brand">
                        <span className="brand-icon">✨</span>
                        <span>MaVi GPT</span>
                    </div>
                    <p className="footer-text">
                        Built with 💜 using Green Coding Principles
                    </p>
                    <p className="footer-copyright">
                        © 2026 MaVi GPT. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;
