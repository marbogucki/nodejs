const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;
const DB_URL = `mongodb+srv://${DB_USER}:${DB_PASS}@task-app.vxvgk.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

const connectMongooseDb = async () => {
    const mongoDbConnection = await mongoose.connect(DB_URL, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useFindAndModify: false
    });

    console.log(`MongoDB connection : ${mongoDbConnection.connection.host}`);
};

module.exports = connectMongooseDb;
