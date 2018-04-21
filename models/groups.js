const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Groups = db.model('groups', {
    _teacher: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name: String,
    description: String
});

module.exports = Groups;