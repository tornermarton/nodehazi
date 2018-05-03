const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/nodehazi');

module.exports = mongoose;