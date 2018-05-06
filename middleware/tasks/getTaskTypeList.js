const requireOption = require('../common').requireOption;

module.exports = function (objectRepository) {

    const TaskTypeModel = requireOption(objectRepository,'taskTypeModel');

    return function (req, res, next) {
        res.locals.taskTypeList = [];

        TaskTypeModel.find({}, function (err, results) {
            if (err) {
                console.error(err);
                return next();
            }

            if (results.length === 0) { //not existing, then basic values

                let dolgozat = new TaskTypeModel();
                dolgozat.name = "Dolgozat";

                dolgozat.save(function (err) {
                    if ((err)) {
                        console.error(err);
                        return next();
                    }

                    let hazi = new TaskTypeModel();
                    hazi.name = "Házi feladat";

                    hazi.save(function (err) {
                        if ((err)) {
                            console.error(err);
                        }

                        return next();
                    });
                });
            } else {
                for (let i = 0; i < results.length; ++i)
                    res.locals.taskTypeList.push({name : results[i].name});

                return next();
            }
        });
    }
};