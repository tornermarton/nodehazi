const requireOption = require('../common').requireOption;

module.exports = function (objectRepository) {
    const TaskModel = requireOption(objectRepository,'taskModel');

    return function (req, res, next) {
        if ((typeof req.body === 'undefined') ||
            (typeof req.body.type === 'undefined') ||
            (typeof req.body.deadline === 'undefined') ||
            (typeof req.body.description === 'undefined')
        ) {
            return next();
        }

        TaskModel.update(
            { url_id : req.params.taskid },
            {
                task_type: req.body.type,
                deadline: req.body.deadline,
                description: req.body.description
            },
            function (err) {
                if (err) console.error(err);

                return res.redirect('/groups/'+ req.params.id);
            }
        );
    };

};