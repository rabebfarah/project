const dotenv = require('dotenv');

dotenv.config();

const Config = {
  PORT: process.env.PORT || 5000,
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb+srv://rabeb:azerty@cluster0.q6otx.mongodb.net/recette?retryWrites=true&w=majority',
  JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
};

module.exports = Config;