const requireOption = require('../common').requireOption;

module.exports = function (objectRepository) {

    const TaskModel = requireOption(objectRepository,'taskModel');
    const GroupModel = requireOption(objectRepository,'groupModel');

    function generateUrlID(length) {
        let str = "";
        let collection = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < length; ++i)
            str += collection.charAt(Math.floor(Math.random() * collection.length));

        return str;
    }

    return function (req, res, next) {
        let urlID = generateUrlID(12);

        if ((typeof req.body === 'undefined') ||
            (typeof req.body.type === 'undefined') ||
            (typeof req.body.deadline === 'undefined') ||
            (typeof req.body.description === 'undefined')
        ) {
            res.json({
                success: false,
                error: "NotEnoughParameters"
            });
            res.end();
            return;
        }

        GroupModel.findOne({ url_id : req.params.id }, function (err, result) {
            if (err) console.error(err);

            //create task
            let newTask = new TaskModel();
            newTask.url_id = urlID;
            newTask._group = result._id;
            newTask.task_type = req.body.type;
            newTask.description = req.body.description;
            newTask.deadline = new Date(req.body.deadline);


            newTask.save(function (err) {
                if ((err)) {
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
        });
    };

};