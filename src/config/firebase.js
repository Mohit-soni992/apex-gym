
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDnLgaKe2Cu5v1JovdmFXxuXdvMv4PLlEc",
  authDomain: "apex-gym.firebaseapp.com",
  projectId: "apex-gym",
  storageBucket: "apex-gym.firebasestorage.app",
  messagingSenderId: "782073693677",
  appId: "1:782073693677:web:d87ab60e5ce2a3f03e13e4",
  measurementId: "G-67EGDY6K3B"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
}

// Optional: Force account selection every time
googleProvider.setCustomParameters({ prompt: 'select_account' })
