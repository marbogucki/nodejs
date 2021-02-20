const express = require('express');
const dotenv = require('dotenv');
const connectMongooseDb = require('./config/db_mongoose');
const errorHandler = require('./middleware/errorHandler');
const articlesRouter = require('./routes/articles');

dotenv.config();

const port = process.env.PORT || 3000;
const apiUrl = process.env.API_URL || '/api/v1';
const app = express();

connectMongooseDb();
app.use(express.json());

// Routes
app.use(`${apiUrl}/articles`, articlesRouter);

// Middlewares
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Runing server on port ${port}`);
});
