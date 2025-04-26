const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  img: String,
  nom: String,
  price: Number,
  color: String,
  categorie: String
});

module.exports = mongoose.model('Product', ProductSchema);
