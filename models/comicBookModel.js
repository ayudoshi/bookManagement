const mongoose = require('mongoose');

// Define schema for a comic book
const comicBookSchema = new mongoose.Schema({
  bookName: { type: String, required: true },
  authorName: { type: String, required: true },
  yearOfPublication: { type: Number, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  numberOfPages: { type: Number, required: true },
  condition: { type: String, enum: ['new', 'used'], default: 'new' },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Export model
module.exports = mongoose.model('ComicBook', comicBookSchema);
