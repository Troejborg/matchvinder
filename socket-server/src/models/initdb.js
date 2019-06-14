const mongoose = require('mongoose');

const connectDb = () => {
  return mongoose.connect("mongodb://localhost:27017/eif_database_1", { useNewUrlParser: true });
};

module.exports = { connectDb }
