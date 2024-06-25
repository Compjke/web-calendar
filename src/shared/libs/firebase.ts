// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const API_KEY = import.meta.env.VITE_API_KEY;

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: API_KEY,
	authDomain: 'web-calendar-5c73e.firebaseapp.com',
	projectId: 'web-calendar-5c73e',
	storageBucket: 'web-calendar-5c73e.appspot.com',
	messagingSenderId: '476490084209',
	appId: '1:476490084209:web:0d9c202a70fd22014b90d0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const googleAuthProvider = new GoogleAuthProvider();
// googleAuthProvider.addScope('profile');
// googleAuthProvider.addScope('email');
export const auth = getAuth(app);
