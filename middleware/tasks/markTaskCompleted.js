const requireOption = require('../common').requireOption;

module.exports = function (objectRepository) {

    const TaskModel = requireOption(objectRepository,'taskModel');

    return function (req, res, next) {
        TaskModel.update(
            { url_id: req.params.taskid },
            { "$push": { "completed_for": req.session.user.id } },
            function (err) {
                if (err) {
                    console.error(err);
                    res.json({
                        success: false,
                        error: "DatabaseError"
                    });
                    res.end();
                    return;
                }

                res.json({
                    success: true,
                    error: null
                });
                res.end();
                return;
        });
    }
};