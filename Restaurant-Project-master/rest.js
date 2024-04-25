const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  namei: String,
  restaurantnamei: String, // Corrected field name
  locationi: String,
  phonenumberi: String,
  passwordi: String,
  emaili: String
});
const RestaurantModel = mongoose.model('Restaurant', restaurantSchema);
module.exports = RestaurantModel;
