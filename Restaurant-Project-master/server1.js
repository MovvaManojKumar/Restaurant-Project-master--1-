// Update the image handling in server1.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  item: String,
  experience: String,
  phonenumber: String,
  location: String,
  availability: String,
  previousExperience: String,
  image: {
    data: { type: String }, // Define data as a String type
    contentType: { type: String } // Define contentType as a String type
  }
});

module.exports = mongoose.model('users', userSchema);