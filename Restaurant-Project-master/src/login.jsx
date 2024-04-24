import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { SignInForm, SignUpForm } from './logini';
import bgImg from './assets/img/footer/bg.png';

const Login = ({ setLoggedIn }) => {
  const [showSignIn, setShowSignIn] = useState(true); // State to toggle between sign-in and sign-up forms
  const [loginSuccess, setLoginSuccess] = useState(false); // State to track login success

  const handleLoginSuccess = () => {
    setLoggedIn(true); // Update loggedIn state in App.js
    setLoginSuccess(true); // Update login success state
  };

  const handleSignUpSuccess = () => {
    setShowSignIn(true); // Show sign-in form after successful signup
  };

  // Redirect to ChefsPage if login is successful
  if (loginSuccess) {
    return <Navigate to="/chefs" />;
  }

  return (
    <>
      <style>
        {`
          body, html {
            margin: 0;
            padding: 0;
            background-image: url(${bgImg});
            background-size: cover;
            background-position: center 10px;
            background-repeat: no-repeat;
            background-attachment: fixed;
            width: 100%;
            height: 100%;
          }
          .container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          .form-container {
            width: 600px; /* Increase the width as needed */
            padding: 40px; /* Increase padding for more space */
            background: rgba(255, 255, 255, 0.9); /* Semi-transparent background */
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.2); /* Add shadow for depth */
          }
        `}
      </style>
      <div className="container">
        <div className="form-container">
          <h2>{showSignIn ? 'Sign In' : 'Sign Up'}</h2>
          {showSignIn ? <SignInForm onLoginSuccess={handleLoginSuccess} /> : <SignUpForm onSignUpSuccess={handleSignUpSuccess} />}
          <p>
            {showSignIn ? "Don't have an account? " : "Already have an account? "}
<Link to="#" onClick={() => setShowSignIn(!showSignIn)}>
{showSignIn ? 'Sign Up' : 'Sign In'}
</Link>
</p>
</div>
</div>
</>
);
};

export default Login;
