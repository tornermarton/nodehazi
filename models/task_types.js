const db = require('../config/db');

const TaskTypes = db.model('task_types', {
    name: String
});

module.exports = TaskTypes;