/**
 * Firebase Configuration
 * 
 * GREEN CODING PRINCIPLE: Firebase eliminates the need for custom backend servers,
 * reducing infrastructure overhead, energy consumption, and maintenance costs.
 * 
 * SDK is initialized ONCE on app load, not on every component mount.
 * This prevents redundant network calls and reduces computational overhead.
 */

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration - Your actual Firebase project credentials
const firebaseConfig = {
  apiKey: "AIzaSyC-tJr-ck6FWEuky0gIYugkTk89EQwIuO8",
  authDomain: "mavi-gpt-d4710.firebaseapp.com",
  projectId: "mavi-gpt-d4710",
  storageBucket: "mavi-gpt-d4710.firebasestorage.app",
  messagingSenderId: "252382057856",
  appId: "1:252382057856:web:6982a282e9a1c43b059d65"
};

/**
 * Initialize Firebase ONCE
 * GREEN CODING: Single initialization prevents redundant SDK setup
 */
const app = initializeApp(firebaseConfig);

/**
 * Authentication instance
 * GREEN CODING: Managed authentication reduces backend compute requirements
 */
export const auth = getAuth(app);

/**
 * Firestore instance
 * GREEN CODING: NoSQL structure allows efficient querying with minimal reads
 */
export const db = getFirestore(app);
