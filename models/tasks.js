const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Tasks = db.model('tasks', {
    url_id: String,
    _group: {
        type: Schema.Types.ObjectId,
        ref: 'groups'
    },
    task_type: String,
    description: String,
    deadline: Date,
    completed_for: [Schema.Types.ObjectId]
});

module.exports = Tasks;