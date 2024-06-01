import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { signUpUser, signInUser } from '../services/auth'; // Adjust the path accordingly

function LoginModal({ isOpen, onClose, isSignUp, switchToSignUp, switchToSignIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const getErrorMessage = (code) => {
    console.log("Error code received:", code); // Add logging to verify error code
    switch (code) {
      case 'auth/email-already-in-use':
        return 'This email address is already in use.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/operation-not-allowed':
        return 'Operation not allowed. Please contact support.';
      case 'auth/weak-password':
        return 'Password is too weak. Please choose a stronger password.';
      case 'auth/user-disabled':
        return 'This account has been disabled.';
      case 'auth/user-not-found':
        return 'No account found with this email address.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/invalid-credential':
        return 'Invalid credentials. Please try again.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (isSignUp && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      if (isSignUp) {
        await signUpUser(email, password, name);
      } else {
        await signInUser(email, password);
      }
      onClose(); // Close the modal after successful sign-up or sign-in
    } catch (error) {
      console.error("Error occurred during sign-in/sign-up:", error); // Add logging to see the full error
      const errorMessage = getErrorMessage(error.code);
      setError(errorMessage);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-20">
      <div className="bg-white p-8 rounded-lg max-w-md w-full relative">
        <FaTimes className="cursor-pointer text-gray-600 absolute top-4 right-4" onClick={onClose} />
        <h2 className="text-2xl font-bold mb-4">{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input 
              type="email" 
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {isSignUp && (
            <div className="mb-4">
              <label className="block text-gray-700">Confirm Password</label>
              <input 
                type="password" 
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
          <p className="mt-4 text-center">
            {isSignUp ? (
              <>
                Already have an account? <span className="text-blue-500 cursor-pointer" onClick={switchToSignIn}>Sign In</span>
              </>
            ) : (
              <>
                Don't have an account? <span className="text-blue-500 cursor-pointer" onClick={switchToSignUp}>Sign Up</span>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
