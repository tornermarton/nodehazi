const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Members = db.model('members', {
    _group: {
        type: Schema.Types.ObjectId,
        ref: 'groups'
    },
    _user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Members;