import React, { useState } from 'react';
import axios from 'axios';

const SimpleAuthForm = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAuthForm, setShowAuthForm] = useState(false);  // Added state for showAuthForm

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/signin', { email, password });
      if (response.data) {
        onSuccess();  // Execute the deferred action after successful login
        setShowAuthForm(false);  // Hide the login form
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
};

export default SimpleAuthForm;