const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const UserModel = require('./server1');
const RestaurantModel = require('./rest'); 
const cors = require('cors');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express(); 
const port = 3001;

app.use(bodyParser.json());
app.use(cors({ origin: 'https://api.render.com/deploy/srv-conm988cmk4c73a849j0?key=bXMzNTMTGDI' }));

mongoose.connect('mongodb+srv://manoj:Movva123@cluster0.ivw5vkw.mongodb.net/chef?retryWrites=true&w=majority');

// Multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 } // Limit file size to 5MB
});

// Get chef image endpoint
app.get('/chefs/:id/image', async (req, res) => {
  try {
    const chef = await UserModel.findById(req.params.id);
    if (!chef || !chef.image) {
      return res.status(404).json({ error: 'Chef not found or image not found.' });
    }

    const base64Image = chef.image.data.toString('base64');
    const imageSrc = `data:${chef.image.contentType};base64,${base64Image}`;

    res.json({ imageSrc });
  } catch (error) {
    console.error('Error fetching chef image:', error);
    res.status(500).json({ error: 'Internal server error. Failed to fetch chef image.' });
  }
});

// Get all chefs endpoint
app.get('/chefs', async (req, res) => {
  try {
    const chefs = await UserModel.find();
    res.json(chefs);
  } catch (error) {
    console.error('Error fetching chefs:', error);
    res.status(500).json({ error: 'Internal server error. Failed to fetch chefs.' });
  }
});

// Sign-up endpoint for chefs
app.post('/signup', upload.array('image', 10), async (req, res) => {
  try {
    // Extract fields from request body
    const { name, email, password, experience, item, phonenumber, location, availability, previousExperience } = req.body;
    const image = req.files; 

    // Check if email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered. Please use a different email.' });
    }

    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format. Please provide a valid email address.' });
    }

    // Validate password length
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user object
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      experience, 
      item,
      phonenumber,
      location,
      availability,
      previousExperience,
      image: {
        data: image && image[0] ? image[0].buffer.toString('base64') : null, // Access image data from "images"
        contentType: image && image[0] ? image[0].mimetype : null // Set content type correctly
      }
    });

    // Save new user to database
    const savedUser = await newUser.save();
    console.log('User signed up:', savedUser);

    // Generate JWT token for the user
    const token = jwt.sign({ userId: savedUser._id }, 'your-secret-key');
    
    res.status(201).json({ user: savedUser, token }); 
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ error: 'Internal server error. Failed to sign up.' });
  }
});
app.post('/signup-restaurant', async (req, res) => {
  try {
    const { name, restaurantname, location, phonenumber, password, email } = req.body;
    if (!name || !restaurantname|| !location || !phonenumber || !password || !email) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const existingRestaurant = await RestaurantModel.findOne({ email });
    if (existingRestaurant) {
      return res.status(400).json({ error: 'Email already registered. Please use a different email.' });
    }
    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format. Please provide a valid email address.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newRestaurant = new RestaurantModel({
      name,
      restaurantname,
      location,
      phonenumber,
      password: hashedPassword,
      email
    });
    const savedRestaurant = await newRestaurant.save();
    console.log('Restaurant signed up:', savedRestaurant);

    res.status(201).json(savedRestaurant);
  } catch (error) {
    console.error('Error signing up restaurant:', error);
    res.status(500).json({ error: 'Internal server error. Failed to sign up restaurant.' });
  }
});
app.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found. Please check your email and password.' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials. Please check your email and password.' });
    }
    const token = jwt.sign({ userId: user._id }, 'your-secret-key');

    res.json({ user, token }); 
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({ error: 'Internal server error. Failed to sign in.' });
  }
});
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
