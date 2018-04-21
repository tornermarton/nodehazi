const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Tasks = db.model('tasks', {
    url_id: String,
    _group: {
        type: Schema.Types.ObjectId,
        ref: 'groups'
    },
    _user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    _task_type: {
        type: Schema.Types.ObjectId,
        ref: 'task_types'
    },
    description: String,
    deadline: Date,
    is_completed: Boolean
});

module.exports = Tasks;