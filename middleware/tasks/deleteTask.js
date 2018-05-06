const requireOption = require('../common').requireOption;

module.exports = function (objectRepository) {

    const TaskModel = requireOption(objectRepository,'taskModel');

    return function (req, res, next) {
        TaskModel.remove( { url_id : req.params.taskid }, function (err) {
            if (err) {
                console.error(err);
                return next();
            }

            return res.redirect('/groups/'+req.params.id);
        });
    }
};