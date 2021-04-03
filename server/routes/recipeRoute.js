const express = require('express');
const Recipe = require('../models/recipeModel');
const { isAuth, isAdmin } = require('../util');

const router = express.Router();

router.get('/', async (req, res) => {
  const category = req.query.category ? { category: req.query.category } : {};
  const searchKeyword = req.query.searchKeyword
    ? {
      name: {
        $regex: req.query.searchKeyword,
        $options: 'i',
      },
    }
    : {};
  const sortOrder = req.query.sortOrder
    ? req.query.sortOrder === 'lowest'
      ? { price: 1 }
      : { price: -1 }
    : { _id: -1 };
  const recipes = await Recipe.find({ ...category, ...searchKeyword }).sort(
    sortOrder
  );
  res.send(recipes);
});

router.get('/:id', async (req, res) => {
  const recipe = await Recipe.findOne({ _id: req.params.id });
  if (recipe) {
    res.send(recipe);
  } else {
    res.status(404).send({ message: 'recipe Not Found.' });
  }
});
router.post('/:id/reviews', isAuth, async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (recipe) {
    const review = {
      name: req.body.name,
      rating: Number(req.body.rating),
      comment: req.body.comment,
    };
    recipe.reviews.push(review);
    recipe.numReviews = recipe.reviews.length;
    recipe.rating =
      recipe.reviews.reduce((a, c) => c.rating + a, 0) /
      recipe.reviews.length;
    const updatedRecipe = await recipe.save();
    res.status(201).send({
      data: updatedRecipe.reviews[updatedRecipe.reviews.length - 1],
      message: 'Review saved successfully.',
    });
  } else {
    res.status(404).send({ message: 'Recipe Not Found' });
  }
});
router.put('/:id', isAuth, isAdmin, async (req, res) => {
  const recipeId = req.params.id;
  console.log(req.params);
  const recipe = await Recipe.findById(recipeId);
  if (recipe) {
    recipe.name = req.body.name;
    recipe.price = req.body.price;
    recipe.image = req.body.image;
    recipe.brand = req.body.brand;
    recipe.category = req.body.category;
    recipe.countInStock = req.body.countInStock;
    recipe.description = req.body.description;
    const updatedRecipe = await recipe.save();
    if (updatedRecipe) {
      return res
        .status(200)
        .send({ message: 'Recipe Updated', data: updatedRecipe });
    }
  }
  return res.status(500).send({ message: ' Error in Updating Recipe.' });
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  const deletedRecipe = await Recipe.findById(req.params.id);
  if (deletedRecipe) {
    await deletedRecipe.remove();
    res.send({ message: 'Recipe Deleted' });
  } else {
    res.send('Error in Deletion.');
  }
});

router.post('/', isAuth, isAdmin, async (req, res) => {
  const recipe = new Recipe({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    brand: req.body.brand,
    category: req.body.category,
    countInStock: req.body.countInStock,
    description: req.body.description,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
  });
  const newRecipe = await recipe.save();
  if (newRecipe) {
    return res
      .status(201)
      .send({ message: 'New Recipe Created', data: newRecipe });
  }
  return res.status(500).send({ message: ' Error in Creating Recipe.' });
});

module.exports = router;
