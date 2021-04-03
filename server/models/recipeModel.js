const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, default: 0 },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  //ingredients: { type: String, required: false },
  //price: { type: Number, default: 0, required: false },
  category: { type: String, required: true },
 // countInStock: { type: Number, default: 0, required: false },
  description: { type: String, required: true },
  rating: { type: Number, default: 0, required: true },
  numReviews: { type: Number, default: 0, required: true },
  reviews: [reviewSchema],
});

const recipeModel = mongoose.model('Recipe', recipeSchema);

module.exports = recipeModel;
