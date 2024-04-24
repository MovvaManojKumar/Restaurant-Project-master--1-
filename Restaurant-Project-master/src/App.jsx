import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';

import ChefsPage from './ChefsPage';
import Login from './login'; // Import the Login component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/chefs" element={<ChefsPage />} />
        <Route path="/login" element={<Login />} /> {/* Render the Login component */}
      </Routes>
    </Router>
  );
};

export default App;