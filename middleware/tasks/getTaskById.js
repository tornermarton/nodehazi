const requireOption = require('../common').requireOption;

module.exports = function (objectRepository) {
    const TaskModel = requireOption(objectRepository, 'taskModel');

    return function (req, res, next) {

        res.locals.taskInfo = [];

        //load group list
        TaskModel.findOne({url_id: req.params.taskid}, function (err, result) {
            if ((err) || !result) {
                console.error(err);
                return next();
            }

            res.locals.taskInfo = result;

            return next();
        });
    }
};