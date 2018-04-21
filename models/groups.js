const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Groups = db.model('groups', {
    url_id: String,
    _teacher: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name: String,
    description: String
});

module.exports = Groups;