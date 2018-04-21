const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nodehazi');

module.exports = mongoose;