import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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
