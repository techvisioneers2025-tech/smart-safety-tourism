
import { initializeApp, getApps, getApp } from 'firebase/app';

const firebaseConfig = {
  "projectId": "studio-566535843-fb14a",
  "appId": "1:447077821709:web:57aeb75b54fcab8de59444",
  "apiKey": "AIzaSyCT8R6FV347Uohx3obLcEpnYtunGZ2ucn4",
  "authDomain": "studio-566535843-fb14a.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "447077821709"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };
