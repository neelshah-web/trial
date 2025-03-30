import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDW6xYhPULy3zscjHDn1Lo5lrjBUxO1BAo",
  authDomain: "queryboard-c163f.firebaseapp.com",
  projectId: "queryboard-c163f",
  storageBucket: "queryboard-c163f.firebasestorage.app",
  messagingSenderId: "937141219123",
  appId: "1:937141219123:web:59b3d3117f67b68e6e9846"
};

// Log configuration in development to help debug
if (process.env.NODE_ENV === 'development') {
  console.log('Firebase Config:', {
    ...firebaseConfig,
    apiKey: firebaseConfig.apiKey ? '[EXISTS]' : '[MISSING]',
  });
}

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.error('Error initializing Firebase:', error);
  throw error;
}

// Initialize Firestore
const db = getFirestore(app);

// Enable persistence for offline support
try {
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
      console.warn('The current browser doesn\'t support all of the features required to enable persistence');
    }
  });
} catch (error) {
  console.error('Error enabling persistence:', error);
}

export { db };