const express = require('express');
const router = express.Router();
const { searchRecipes } = require('../controllers/SearchController');
const { recommendRecipes } = require('../controllers/RecipeController')
const { recipeFinder } = require('../controllers/RecipeFinder')
const { cuisineFinder } = require('../controllers/CuisineFinder'); // Import cuisineFinder function
const { totalPages } = require('../controllers/TotalPages'); 

router.get('/search', searchRecipes);
router.get('/myfridge', recommendRecipes);
router.get('/recipe/:recipeName', recipeFinder);
router.get('/cuisine/:cuisine', cuisineFinder);
router.get('/totalPages/:searchInput', totalPages);

module.exports = router;