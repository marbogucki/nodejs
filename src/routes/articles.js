const express = require('express');
const {
    createArticle,
    fetchArticles,
    fetchArticle,
    updateArticle,
    removeArticle
} = require('../controllers/articles');
const router = express.Router();

router.route('/')
    .get(fetchArticles)
    .post(createArticle);
      
router.route('/:id')
    .get(fetchArticle)
    .delete(removeArticle)
    .put(updateArticle);

module.exports = router;