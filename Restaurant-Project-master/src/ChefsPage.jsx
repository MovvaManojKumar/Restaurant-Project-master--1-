import React, { useEffect, useState } from 'react';
import axios from 'axios';
import bgImage from './assets/img/testimonial/bg.png';
import { motion } from 'framer-motion';

function ChefsPage() {
  const [chefs, setChefs] = useState([]);
  const [selectedChef, setSelectedChef] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState('all');
  const [loggedIn, setLoggedIn] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    experience: '',
    item: '',
    phonenumber: '',
    location: '',
    availability: '',
    previousExperience: ''
  });

  useEffect(() => {
    axios.get('https://chefs-palace-server.onrender.com/chefs')
      .then((response) => {
        setChefs(response.data);
      })
      .catch((err) => console.error('Error fetching chef data:', err));
  }, []);

  const handleViewDetails = (chef) => {
    setSelectedChef(chef);
    setFormData({
      name: chef.name,
      experience: chef.experience.toString(),
      item: chef.item,
      phonenumber: chef.phonenumber,
      location: chef.location,
      availability: chef.availability,
      previousExperience: chef.previousExperience
    });
    setEditMode(false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  const handleDelete = (chefId) => {
    axios.delete(`https://chefs-palace-server.onrender.com/chefs/${chefId}`)
      .then(() => {
        setChefs(chefs.filter(chef => chef._id !== chefId));
        setSelectedChef(null);
      })
      .catch(err => console.error('Error deleting chef:', err));
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });

      // Append image file if it's part of the form
      // Assuming you have a file input for images
      // const fileInput = document.querySelector('input[type="file"]');
      // if (fileInput && fileInput.files[0]) {
      //   data.append('image', fileInput.files[0]);
      // }

      const response = await axios.put(`https://chefs-palace-server.onrender.com/chefs/${selectedChef._id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Update chefs state with the updated chef
      const updatedChefs = chefs.map(chef => chef._id === selectedChef._id ? { ...chef, ...formData } : chef);
      setChefs(updatedChefs);
      setEditMode(false);
      setSelectedChef(null);
    } catch (error) {
      console.error('Error updating chef:', error);
      // Handle error
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const filteredChefs = chefs.filter((chef) => {
    if (filterOption === 'all') {
      return chef.name.toLowerCase().includes(searchQuery.toLowerCase());
    } else {
      const [minExp, maxExp] = filterOption.split('-').map((exp) => parseInt(exp));
      return chef.experience >= minExp && chef.experience <= maxExp;
    }
  });

  return (
    <>
      <style>
        {`
          body, html {
            margin: 0;
            padding: 0;
            background-image: url(${bgImage});
            background-size: cover;
            background-position: center 10px;
            background-repeat: no-repeat;
            background-attachment: fixed;
            width: 100%;
            height: 100%;
          }
          nav {
            background-color: #4a5568;
            padding: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          nav h1 {
            color: #ffffff;
          }
          input[type='text'], select {
            background-color: #ffffff;
          }
        `}
      </style>
      <nav className="bg-gray-900 py-4">
        <div className="flex items-center justify-between w-full mx-auto px-4">
          <a href="/" className="text-2xl font-bold text-white">Chef's Palace</a>
          {loggedIn && <FaUser className="text-white ml-2" />}
          <div className="flex">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="border border-gray-300 rounded-md px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <select
              value={filterOption}
              onChange={handleFilterChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="all">All</option>
              <option value="0-5">0 - 5 years</option>
              <option value="6-10">6 - 10 years</option>
              <option value="11-15">11 - 15 years</option>
              <option value="16-20">16 - 20 years</option>
              <option value="21-25">21 - 25 years</option>
              <option value="26-30">26 - 30 years</option>
              <option value="31-35">31 - 35 years</option>
              <option value="36-40">36 - 40 years</option>
            </select>
          </div>
        </div>
      </nav>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4"
      >
        {filteredChefs.map((chef, index) => (
          <motion.div
            key={chef._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index }}
            className="bg-white rounded-lg shadow-lg p-6 bg-opacity-80"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleViewDetails(chef)}
          >
            <motion.img
              src={`data:${chef.image.contentType};base64,${chef.image.data}`}
              alt={chef.name}
              className="mb-4 w-32 h-32 rounded-lg shadow-md"
              style={{ objectFit: 'cover' }}
            />
            <motion.h2
              className="text-lg font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 * index + 0.5 }}
            >
              {chef.name}
            </motion.h2>
            <motion.p
              className="text-gray-600 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 * index + 0.7 }}
            >
              Experience: {chef.experience} years
            </motion.p>
            <motion.p
              className="text-gray-600 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 * index + 0.9 }}
            >
              Expert Food Item: {chef.item}
            </motion.p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => handleEdit()}>
              Edit Details
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => handleDelete(chef._id)}>
              Delete
            </button>
          </motion.div>
        ))}
      </motion.div>
      {selectedChef && editMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <form onSubmit={handleUpdate}>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="mb-2 p-2 w-full" />
              <input type="text" name="experience" value={formData.experience} onChange={handleChange} placeholder="Experience" className="mb-2 p-2 w-full" />
              <input type="text" name="item" value={formData.item} onChange={handleChange} placeholder="Expert Food Item" className="mb-2 p-2 w-full" />
              <input type="text" name="phonenumber" value={formData.phonenumber} onChange={handleChange} placeholder="Phone Number" className="mb-2 p-2 w-full" />
              <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="mb-2 p-2 w-full" />
              <input type="text" name="availability" value={formData.availability} onChange={handleChange} placeholder="Availability" className="mb-2 p-2 w-full" />
              <input type="text" name="previousExperience" value={formData.previousExperience} onChange={handleChange} placeholder="Previous Experience" className="mb-2 p-2 w-full" />
              <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Update Chef
              </button>
              <button type="button" onClick={() => { setEditMode(false); setSelectedChef(null); }} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4">
                Cancel
              </button>
            </form>
          </div>
        </motion.div>
      )}
      {selectedChef && !editMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">{selectedChef.name}</h2>
            <p className="text-gray-600 mb-2">Experience: {selectedChef.experience} years</p>
            <p className="text-gray-600 mb-2">Expert Food Item: {selectedChef.item}</p>
            <p className="text-gray-600 mb-2">Phone Number: {selectedChef.phonenumber}</p>
            <p className="text-gray-600 mb-2">Availability Time: {selectedChef.availability}</p>
            <p className="text-gray-600 mb-2">Location: {selectedChef.location}</p>
            <p className="text-gray-600 mb-2">Previous Experience: {selectedChef.previousExperience}</p>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
              onClick={() => setSelectedChef(null)}
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}

export default ChefsPage;
