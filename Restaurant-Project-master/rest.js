const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: String,
  restaurantname: String, // Corrected field name
  location: String,
  phonenumber: String,
  password: String,
  email: String
});
const RestaurantModel = mongoose.model('Restaurant', restaurantSchema);
module.exports = RestaurantModel;
