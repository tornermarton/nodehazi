const requireOption = require('../common').requireOption;

module.exports = function (objectRepository) {

    const GroupModel = requireOption(objectRepository,'groupModel');
    const TaskModel = requireOption(objectRepository, 'taskModel');

    return function (req, res, next) {

        res.locals.groupTaskList = [];

        GroupModel.findOne({ url_id : req.params.id }, function (err, result) {
            if (err) console.error(err);

            //load task list
            TaskModel.find({_group: result._id, completed_for: { "$ne" : req.session.user.id } }, function (err, results) {
                if ((err)) {
                    console.error(err);
                    return next();
                }

                for (let i = 0; i < results.length; ++i) {
                    res.locals.groupTaskList[i] = {
                        url_id: results[i].url_id,
                        type: results[i].task_type,
                        description: results[i].description,
                        deadline: results[i].deadline.getFullYear() + '. ' + (results[i].deadline.getMonth() + 1) + '. ' + results[i].deadline.getDate() + '.'
                    };
                }

                return next();
            });
        });
    }
};