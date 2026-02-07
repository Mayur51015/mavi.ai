/**
 * Theme Context - Global Theme Management
 * 
 * Provides theme state (light/dark) to entire application
 * Persists theme preference in localStorage
 */

import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    // Initialize theme from localStorage or default to 'dark'
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('mavi-theme');
        return savedTheme || 'dark';
    });

    // Update document attribute and localStorage when theme changes
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('mavi-theme', theme);
    }, [theme]);

    // Toggle between light and dark
    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
