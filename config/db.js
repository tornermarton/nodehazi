const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ozfkfp');

module.exports = mongoose;