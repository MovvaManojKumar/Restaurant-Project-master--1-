import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import bgImg from './assets/img/footer/bg.png';

const SignUpForm = ({ onSignUpSuccess }) => {
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [item, setItem] = useState('');
  const [experience, setExperience] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [location, setLocation] = useState('');
  const [availability, setAvailability] = useState('');
  const [previousExperience, setPreviousExperience] = useState('');
  const [restaurantname, setRestaurantName] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState(null); // State to handle email already registered error

  const handleImageChange = (e) => {
    setImage(e.target.files);
    
  };
  
  const validateEmail = (email) => {
    // Basic email validation using regular expression
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    // Password length validation
    return password.length >= 8;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setEmailError(null); // Reset email error
   // if(role==='chef')
   // {
   //   const endpoint='http://localhost:3001/signup'
   // }
   // else
   // {
    //  const endpoint='http://localhost:3001/signup-restaurant'
    //}
    let endpoint;
if (role === 'chef') {
    endpoint = 'https://chefs-palace-server.onrender.com/signup';
} else {
    endpoint = 'https://chefs-palace-server.onrender.com/signup-restaurant';
}
    const formData = new FormData();
    let formValid = true;
    
    if (role === 'chef') {
      // Append chef-specific fields
      if (!name || !experience || !phonenumber || !item || !email || !password || !availability) {
        setError('All fields are required.');
        formValid = false;
      
      }
    
      if (!validateEmail(email)) {
        setError('Please enter a valid email address.');
        formValid = false;
      }
    
      if (!validatePassword(password)) {
        setError('Password must be at least 8 characters long.');
        formValid = false;
      }
    
      if (formValid) {
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('item', item);
        formData.append('experience', experience);
        formData.append('phonenumber', phonenumber);
        formData.append('location', location);
        formData.append('availability', availability);
        formData.append('previousExperience', previousExperience);
        for (let i = 0; i < image.length; i++) {
          formData.append('image', image[i]);
        }
      }
    } else if (role === 'restaurant') {
      // Append restaurant-specific fields
      if (!name || !restaurantname || !location|| !phonenumber || !password || !email) {
        setError('All fields are required.');
        formValid = false;
       
      }
      else if (!validateEmail(email)) {
        setEmailError('Invalid email format.');
        formValid = false;
      } else if (!validatePassword(password)) {
        setError('Password must be at least 8 characters long.');
        formValid = false;
      }
      if (formValid) {
        formData.append('name', name);
        formData.append('restaurantname', restaurantname);
        formData.append('location', location);
        formData.append('phonenumber', phonenumber);
        formData.append('password', password);
        formData.append('email', email);
      }
    }
    
    if (!formValid) return;
    
    try {
      const response = await axios.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    
      console.log('Signup successful:', response.data);
      // Call the onSignUpSuccess callback
      onSignUpSuccess();
    } catch (error) {
      console.error('Signup failed:', error);
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } 
    }
    
  };
  
  return (
    <>
      <style>
        {`
          body, html {
            margin: 0;
            padding: 0;
            background-image: url(${bgImg});
        
        `}
      </style>
      <nav className="bg-gray-900 py-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-4"
        >
        <label className="block text-white-700 text-sm font-bold mb-2" htmlFor="role">
        Choose your role:
      </label>
      <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="role" value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="">Select role</option>
        <option value="chef">Chef</option>
      </select>
        </motion.div>
      </nav>
    <div>
      {role === 'chef' && (
        <form className="mt-1" onSubmit={handleSubmit}>
          <div className="mt-20">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name:
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="experience">
              Experience:
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="experience" name="experience" type="text" value={experience} onChange={(e) => setExperience(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phonenumber">
              Phone Number:
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phonenumber" name="phonenumber" type="text" value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="item">
              Expert Food Item:
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="item" name="item" type="text" value={item} onChange={(e) => setItem(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email:
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" name="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
            Location:
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="location" name="location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="previousExperience">
            Previous Work place:
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="previousExperience" name="previousExperience" type="text" value={previousExperience} onChange={(e) => setPreviousExperience(e.target.value)} required />
          </div>
          <div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
    Password:
  </label>
  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
</div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="availability">
              Availability:
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="availability" name="availability" type="text" value={availability} onChange={(e) => setAvailability(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label htmlFor="image">
              Select an image:
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="image" name="image" type="file" multiple  onChange={handleImageChange} required />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Sign Up
            </button>
          </div>
          {emailError && <p className="text-red-500 mt-2">{emailError}</p>}

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      )}

      {role === 'restaurant' && (
       <form className="mt-1" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name:
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-smfont-bold mb-2" htmlFor="restaurantname">
              Restaurant Name:
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="restaurantname" name="restaurantname" type="text" value={restaurantname} onChange={(e) => setRestaurantName(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
              Location:
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="location" name="location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
          </div>
          <div className="mb-4"> 
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email:
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" name="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              password:
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" name="password" type="text" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phonenumber">
              Phone Number:
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phonenumber" name="phonenumber" type="text" value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} required />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Sign Up
            </button>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      )}
    </div>
    </>
  );
};

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('https://chefs-palace-server.onrender.com/signin', {
        email,
        password
      });

      console.log('Signin successful:', response.data);

      // Reset form fields after successful sign in
      setEmail('');
      setPassword('');

      // Redirect to the chefs page after successful login
      window.location.href = '/chefs';
    } catch (error) {
      console.error('Signin failed:', error);
      setError('Signin failed. Please try again.');
    }
  };
  return (
    <div>
      <form className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSignIn}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email:
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password:
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Sign In
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export { SignUpForm, SignInForm ,};
