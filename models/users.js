const db = require('../config/db');

const Users = db.model('users', {
    email: String,
    password: String,
    firstname: String,
    lastname: String,
    date_of_birth: Date,
    status: {
        type: Number,
        default: 0
    }
});

module.exports = Users;