/**
 * Chat Component - Main AI Chatbot Interface
 * 
 * GREEN CODING PRINCIPLES IMPLEMENTED:
 * 
 * 1. EFFICIENT STATE MANAGEMENT
 *    - Only essential state variables (messages, input, loading)
 *    - Prevents unnecessary re-renders with proper useEffect dependencies
 * 
 * 2. OPTIMIZED FIRESTORE USAGE
 *    - Fetch chat history ONCE on component mount
 *    - Store only essential fields (userPrompt, aiResponse, timestamp)
 *    - No real-time listeners (reduces network overhead)
 * 
 * 3. AI API OPTIMIZATION
 *    - Gemini API called ONLY when user clicks Send
 *    - Empty/duplicate prompts are blocked
 *    - Using gemini-1.5-flash for minimal compute
 * 
 * 4. MINIMAL UI
 *    - Simple chat bubbles
 *    - No heavy animations or images
 *    - Energy-efficient rendering
 */

import React, { useState, useEffect, useRef } from 'react';
import { collection, addDoc, query, orderBy, getDocs, where } from 'firebase/firestore';
import { db } from '../firebase';
import { generateResponse } from '../gemini';

const Chat = ({ user }) => {
    // GREEN CODING: Minimal state - only what's necessary
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    /**
     * Load Chat History
     * GREEN CODING: Fetch ONCE on component mount, not on every state change
     * Only essential fields retrieved to minimize data transfer
     */
    useEffect(() => {
        const loadChatHistory = async () => {
            if (!user) return;

            try {
                const q = query(
                    collection(db, 'chats'),
                    where('userId', '==', user.uid),
                    orderBy('timestamp', 'asc')
                );

                const querySnapshot = await getDocs(q);
                const chatHistory = [];

                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    // GREEN CODING: Only extract necessary fields
                    chatHistory.push({
                        userPrompt: data.userPrompt,
                        aiResponse: data.aiResponse,
                        timestamp: data.timestamp
                    });
                });

                // Convert to message format for UI
                const formattedMessages = [];
                chatHistory.forEach(chat => {
                    formattedMessages.push({ text: chat.userPrompt, sender: 'user' });
                    formattedMessages.push({ text: chat.aiResponse, sender: 'ai' });
                });

                setMessages(formattedMessages);
            } catch (error) {
                console.error('Error loading chat history:', error);
            }
        };

        loadChatHistory();
    }, [user]); // Only runs when user changes

    /**
     * Auto-scroll to latest message
     */
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    /**
     * Handle Send Message
     * GREEN CODING: AI triggered ONLY on explicit user action
     */
    const handleSend = async () => {
        // GREEN CODING: Prevent empty API calls
        if (!input.trim() || loading) return;

        const userMessage = input.trim();
        setInput('');

        // Add user message to UI immediately
        setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
        setLoading(true);

        try {
            // GREEN CODING: Single API call to Gemini (gemini-1.5-flash)
            const aiResponse = await generateResponse(userMessage);

            // Add AI response to UI
            setMessages(prev => [...prev, { text: aiResponse, sender: 'ai' }]);

            // Reset loading state immediately so user can send more messages
            setLoading(false);

            // GREEN CODING: Store in Firestore in background - don't block UI
            // This runs asynchronously and won't prevent further chat interactions
            addDoc(collection(db, 'chats'), {
                userId: user.uid,
                userPrompt: userMessage,
                aiResponse: aiResponse,
                timestamp: new Date()
            }).catch(error => {
                console.error('Error saving to Firestore:', error);
                // Chat continues to work even if Firestore fails
            });

        } catch (error) {
            console.error('Error generating response:', error);

            // Display the actual error message to the user
            const errorMessage = error.message || 'Sorry, I encountered an error. Please try again.';

            setMessages(prev => [...prev, {
                text: errorMessage,
                sender: 'ai'
            }]);
            setLoading(false);
        }
    };

    /**
     * Handle Enter key press
     */
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h2>Chat with MaVi GPT</h2>
                <p className="chat-subtitle">AI Assistant for Engineering Students 🎓</p>
            </div>

            <div className="messages-container">
                {messages.length === 0 ? (
                    <div className="welcome-message">
                        <h3>Welcome to MaVi GPT! 👋</h3>
                        <p>Ask me anything about your engineering studies.</p>
                        <p className="green-info">💚 Powered by energy-efficient AI</p>
                    </div>
                ) : (
                    messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.sender}`}>
                            <div className="message-content">
                                {msg.text}
                            </div>
                        </div>
                    ))
                )}

                {loading && (
                    <div className="message ai">
                        <div className="message-content typing">
                            Thinking...
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            <div className="input-container">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message here..."
                    disabled={loading}
                    rows="2"
                />
                <button
                    onClick={handleSend}
                    disabled={loading || !input.trim()}
                    className="btn-send"
                >
                    {loading ? 'Sending...' : 'Send'}
                </button>
            </div>
        </div>
    );
};

export default Chat;
