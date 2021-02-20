const Article = require('../models/articles');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../helpers/errorResponse');

// @desc Fetch All Articles
// @route GET /api/v1/articles
// @access Public
const fetchArticles = asyncHandler(async (req, res, next) => {
    const articles = await Article.find({});
    res.status(200).json({
        success: true,
        data: articles
    });
});

// @desc Fetch Single Article
// @route GET /api/v1/articles/:id
// @access Public
const fetchArticle = asyncHandler(async (req, res, next) => {
    const article = await Article.findById(req.params.id);

    if(!article) {    
        return next(
            new ErrorResponse(`Article not found with id: ${req.params.id}`, 404)
        );
    }

    res.status(200).json({
        success: true,
        data: article,
    });
});

// @desc Create Article
// @route POST /api/v1/articles
// @access Public
const createArticle = asyncHandler(async (req, res, next) => {
    const article = new Article(req.body);

    await article.save();
    res.status(201).json({
        success: true,
        data: article
    });
});

// @desc Update Article
// @route PUT /api/v1/articles/:id
// @access Public
const updateArticle = asyncHandler(async (req, res, next) => {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });

    if(!article) {
        return next(
            new ErrorResponse(`Article not found - id: ${req.params.id}`, 404)
        );
    }

    res.status(200).json({
        success: true,
        data: article
    });
});

// @desc Remove Article
// @route DELETE /api/v1/articles/:id
// @access Public
const removeArticle = asyncHandler(async (req, res, next) => {
    const article = await Article.findByIdAndDelete(req.params.id);

    if(!article) {
        return next(
            new ErrorResponse(`Article not found - id: ${req.params.id}`, 404)
        );
    }

    const articleCount = await Article.countDocuments({});

    res.status(200).json({
        success: true,
        data: {
            article,
            count: articleCount
        }
    });
});

module.exports = {
    createArticle,
    fetchArticles,
    fetchArticle,
    updateArticle,
    removeArticle,
};