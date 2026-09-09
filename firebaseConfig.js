import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, initializeAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const firebaseConfig = {
  apiKey: 'AIzaSyB3V89auR3STPrtQYP3A4djm-R0-lm9wpI',
  authDomain: 'weeklabs1.firebaseapp.com',
  projectId: 'weeklabs1',
  storageBucket: 'weeklabs1.firebasestorage.app',
  messagingSenderId: '129237375434',
  appId: '1:129237375434:web:c4df210ed69d59824c1733',
  measurementId: 'G-EGK715BY6B',
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);

let auth;
if (Platform.OS === 'web') {
  auth = getAuth(app);
} else {
  // Firebase exposes this helper in its React Native entry point only.
  const { getReactNativePersistence } = require('firebase/auth');
  try {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error) {
    if (error.code !== 'auth/already-initialized') throw error;
    auth = getAuth(app);
  }
}

export { auth };
