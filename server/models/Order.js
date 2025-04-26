const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  productName: String,
  size: String,
  quantity: Number,
  email: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);