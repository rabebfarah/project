const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const userRoute = require('./routes/userRoute');
const recipeRoute = require('./routes/recipeRoute');
const orderRoute = require('./routes/orderRoute');
const uploadRoute = require('./routes/uploadRoute');

const mongodbUrl = config.MONGODB_URL;
mongoose
    .connect(mongodbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .catch((error) => console.log(error.reason));

const app = express();
app.use(bodyParser.json());
app.use('/api/uploads', uploadRoute);
app.use('/api/users', userRoute);
app.use('/api/recipes', recipeRoute);
app.use('/api/orders', orderRoute);
app.use('/uploads', express.static(path.join(__dirname, './uploads')));


app.listen(config.PORT, () => {
    console.log('Server started at http://localhost:5000');
});
