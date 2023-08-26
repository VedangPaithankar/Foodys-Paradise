const express = require('express');
const router = express.Router();
const { searchRecipes } = require('../controllers/SearchController');
const { recommendRecipes } = require('../controllers/RecipeController')
const { recipeFinder } = require('../controllers/RecipeFinder')
const { cuisineFinder } = require('../controllers/CuisineFinder'); // Import cuisineFinder function

router.get('/search', searchRecipes);
router.get('/myfridge', recommendRecipes);
router.get('/recipe/:recipeName', recipeFinder);
router.get('/cuisine/:cuisine', cuisineFinder);

module.exports = router;