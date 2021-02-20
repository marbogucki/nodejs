const { Schema, model } = require('mongoose');

const ArticleSchema = new Schema({
    title: { 
        type: String,
        required: [true, 'Title field is required'],
        unique: true,
        trim: true
    },
    description: {
        required: [true, 'Description is required'],
        type: String
    },
    public: {
        type: Boolean,
        required: true,
    }
}, {
    timestamps: true
});

ArticleSchema.index({
    title: 'text',
    description: 'text',
});

const Article = model('article', ArticleSchema);

module.exports = Article;
