const SearchController = require('../controllers/search.controller')
const Express = require('express');
const { authenticateToken } = require('../middleware/isAuthenticate');
const searchRouter = Express.Router();

searchRouter.get('/ai-search', authenticateToken, SearchController.requestSuggestByAI);
searchRouter.get('/e-search', SearchController.searchEvents);
searchRouter.get('/all-category', SearchController.getAllCategoryFromEvents);
searchRouter.get('/rating-search', SearchController.searchByRatingOrganization)

module.exports = searchRouter;