/**
 * Google Gemini AI Configuration
 * 
 * GREEN CODING PRINCIPLES:
 * 1. Using gemini-1.5-flash - lightest model for reduced computational cost
 * 2. API calls are ONLY triggered on user action (Send button)
 * 3. No background processing or auto-suggestions
 * 4. Single request-response pattern (no streaming unless needed)
 * 5. Direct API integration reduces middleware overhead
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

// Get API key from environment variables (stored in .env.local)
// GREEN CODING: Secure key management prevents leaks and unauthorized usage
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

/**
 * Initialize Gemini AI ONCE
 * GREEN CODING: Single initialization prevents redundant API setup
 */
const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * Get Gemini Model
 * GREEN CODING: Using gemini-1.5-flash - the most energy-efficient model
 * This model balances performance with minimal computational requirements
 * 
 * @returns {Object} Gemini model instance
 */
export const getGeminiModel = () => {
    return genAI.getGenerativeModel({
        model: 'gemini-2.5-flash' // Using supported model
    });
};

/**
 * Generate AI Response
 * GREEN CODING: On-demand generation only when user explicitly requests
 * No pre-fetching, no background processing
 * 
 * @param {string} prompt - User's message
 * @returns {Promise<string>} AI response text
 */
export const generateResponse = async (prompt) => {
    try {
        // Input validation to prevent empty API calls
        if (!prompt || prompt.trim().length === 0) {
            throw new Error('Prompt cannot be empty');
        }

        const model = getGeminiModel();

        // Single API call - no retries unless necessary
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return text;
    } catch (error) {
        console.error('Gemini API Error:', error);

        // Check if it's a quota error
        if (error.message && error.message.includes('quota')) {
            throw new Error('⚠️ API Quota Exceeded! Your free tier limit has been reached. Please wait 24 hours for quota reset or upgrade your API key.');
        }

        // Check if it's a rate limit error (429)
        if (error.message && (error.message.includes('429') || error.message.includes('Too Many Requests'))) {
            throw new Error('⚠️ Rate Limit Exceeded! Too many requests. Please wait a few minutes and try again.');
        }

        throw error;
    }
};
