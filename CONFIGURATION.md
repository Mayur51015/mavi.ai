# 🔧 Configuration Guide - MaVi GPT

## Step 1: Firebase Setup

### Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Enter project name: **"mavigpt"** or your preferred name
4. Disable Google Analytics (optional for this project)
5. Click "Create Project"

### Enable Authentication
1. In Firebase Console, go to **Build** → **Authentication**
2. Click "Get Started"
3. Click on **Sign-in method** tab
4. Enable **Email/Password** authentication
5. Click "Save"

### Create Firestore Database
1. In Firebase Console, go to **Build** → **Firestore Database**
2. Click "Create database"
3. Select **Start in test mode** (for development)
4. Choose your preferred location
5. Click "Enable"

### Set Firestore Rules (Important for Security)
1. In Firestore Database, go to **Rules** tab
2. Replace with these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow users to read/write only their own chat history
    match /chats/{chatId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

3. Click "Publish"

### Get Firebase Configuration
1. In Firebase Console, click the **gear icon** → **Project settings**
2. Scroll down to "Your apps" section
3. Click the **Web icon** `</>`
4. Register app with nickname: **"MaVi GPT Web"**
5. Copy the `firebaseConfig` object

## Step 2: Google Gemini API Setup

### Get Gemini API Key
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Get API Key"
3. Click "Create API key in new project" (or select existing project)
4. Copy the API key

**Important:** Keep your API key secure and never commit it to public repositories!

## Step 3: Configure Your Application

### Update Firebase Configuration
Open `src/firebase.js` and replace the placeholder values:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",              // Replace this
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",  // Replace YOUR_PROJECT_ID
  projectId: "YOUR_PROJECT_ID",               // Replace this
  storageBucket: "YOUR_PROJECT_ID.appspot.com",   // Replace YOUR_PROJECT_ID
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // Replace this
  appId: "YOUR_APP_ID"                        // Replace this
};
```

### Update Gemini API Configuration
Open `src/gemini.js` and replace the API key:

```javascript
const API_KEY = 'YOUR_ACTUAL_GEMINI_API_KEY';  // Replace this
```

## Step 4: Run the Application

### Install Dependencies (if not already done)
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```

### Access the Application
Open your browser and go to: **http://localhost:5173/**

## Step 5: Test the Application

### Test Registration
1. Click "Register"
2. Enter email and password
3. Submit the form
4. Should redirect to Chat page

### Test Chat Functionality
1. Type a message in the chat input
2. Click "Send"
3. Wait for AI response
4. Message should be saved to Firestore

### Test Authentication Persistence
1. Refresh the page
2. Should remain logged in
3. Chat history should load

### Test Logout
1. Click "Logout" button
2. Should redirect to Login page

## 🌱 Green Coding Verification

### Verify Energy-Efficient Implementation
- ✅ API calls only happen on user action (no polling)
- ✅ Firestore fetches chat history once per session
- ✅ Using gemini-1.5-flash (lightweight model)
- ✅ Minimal re-renders (check React DevTools)
- ✅ No heavy animations or assets

### Monitor API Usage
1. Check [Firebase Console](https://console.firebase.google.com/) → **Firestore** → **Usage**
2. Check [Google AI Studio](https://aistudio.google.com/) → **API Keys** → Usage stats
3. Verify minimal API calls

## 🚨 Troubleshooting

### Firebase Authentication Errors
- Make sure Email/Password is enabled in Firebase Console
- Check that firebaseConfig values are correct
- Verify project is not in restricted mode

### Gemini API Errors
- Verify API key is correct
- Check API key has no restrictions
- Ensure you're using gemini-1.5-flash model

### Chat Not Saving
- Check Firestore rules allow authenticated users
- Verify user is logged in
- Check browser console for errors

### CORS Errors
- Firebase and Gemini APIs handle CORS automatically
- If issues persist, check Firebase project settings

## 📱 For Production Deployment

### Update Firestore Rules for Production
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /chats/{chatId} {
      allow read: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && 
                     request.auth.uid == request.resource.data.userId &&
                     request.resource.data.keys().hasOnly(['userId', 'userPrompt', 'aiResponse', 'timestamp']);
      allow update, delete: if false;
    }
  }
}
```

### Build for Production
```bash
npm run build
```

### Deploy
Deploy the `dist` folder to your preferred hosting:
- Firebase Hosting
- Vercel
- Netlify
- GitHub Pages

## ✅ Configuration Complete!

Your MaVi GPT application is now ready for development and demonstration! 🎉
