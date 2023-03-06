const mongoose = require('mongoose');

const connectionDB = (url) => {
  mongoose.set('strictQuery', false);
  return mongoose.connect(url);
};

module.exports = connectionDB;
