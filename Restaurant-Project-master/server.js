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

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://manoj:Movva123@cluster0.ivw5vkw.mongodb.net/chef?retryWrites=true&w=majority');
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

const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 } // Limit file size to 5MB
});

app.get('/chefs', async (req, res) => {
  try {
    const chefs = await UserModel.find();
    res.json(chefs);
  } catch (error) {
    console.error('Error fetching chefs:', error);
    res.status(500).json({ error: 'Internal server error. Failed to fetch chefs.' });
  }
});
// Update the /signup endpoint in server.js
app.post('/signup', upload.array('image', 10), async (req, res) => {
  try {
    const { name, email, password, experience, item, phonenumber, location, availability, previousExperience } = req.body;
    const image= req.files; // Corrected variable name to "images"

    // Check if the email already exists in the database
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

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

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
        data: image[0].buffer.toString('base64'), // Access image data from "images"
        contentType: image[0].mimetype // Set content type correctly
      }
    });

    
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
// Sign-up endpoint for restaurants without image
app.post('/signup-restaurant', async (req, res) => {
  try {
    const { name, restaurantname, location, phonenumber, password, email } = req.body;

    // Check if the email already exists in the database
    const existingRestaurant = await RestaurantModel.findOne({ email });
    if (existingRestaurant) {
      return res.status(400).json({ error: 'Email already registered. Please use a different email.' });
    }

    // Validate email format
  
    const newRestaurant = new RestaurantModel({
      name,
      restaurantname,
      location,
      phonenumber,
      password,
      email,
      image: {
        data: image[0].buffer.toString('base64'), // Access image data from "images"
        contentType: image[0].mimetype // Set content type correctly
      }
    });

    const savedRestaurant = await newRestaurant.save();
    console.log('Restaurant signed up:', savedRestaurant);

    res.status(201).json(savedRestaurant);
  } catch (error) {
    console.error('Error signing up restaurant:', error);
    res.status(500).json({ error: 'Internal server error. Failed to sign up restaurant.' });
  }
});

// Sign-in endpoint
app.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found. Please check your email and password.' });
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials. Please check your email and password.' });
    }

    // Generate JWT token for the user
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
