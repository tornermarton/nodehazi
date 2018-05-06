const requireOption = require('../common').requireOption;

module.exports = function (objectRepository) {

    const TaskModel = requireOption(objectRepository,'taskModel');

    return function (req, res, next) {
        TaskModel.update(
            { url_id: req.params.taskid },
            { "$push": { "completed_for": req.session.user.id } },
            function (err, results) {
                if (err) {
                    console.error(err);
                    return next();
                }
        });
    }
};