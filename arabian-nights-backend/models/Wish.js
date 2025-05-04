const mongoose = require('mongoose');

const wishSchema = new mongoose.Schema({
    name: String,
    wish: String,
    mediaType: String,
    mediaUrl: String, // ← assure-toi qu’il est bien défini
    createdAt: { type: Date, default: Date.now }
  });
  
  

module.exports = mongoose.model('Wish', wishSchema);
