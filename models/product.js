const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  phone_number: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Product', ProductSchema);
