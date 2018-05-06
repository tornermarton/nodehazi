const requireOption = require('../common').requireOption;

/**
 * REQUIRES GROUP LIST BEFORE!!!
 *
 *
 * @param objectRepository
 * @returns {Function}
 */

module.exports = function (objectRepository) {
    const TaskModel = requireOption(objectRepository, 'taskModel');
    const MemberModel = requireOption(objectRepository,'memberModel');

    return function (req, res, next) {

        res.locals.todayTaskList = [];
        res.locals.weekTaskList = [];

        MemberModel.find({ _user: req.session.user.id }).populate({
            path: '_group',
            select: '_id'
        }).exec(function (err, results) {
            if ((err)) {
                console.error(err);
                return next();
            }

            let groupIdList = [];

            for (let i = 0; i < results.length; ++i)
                groupIdList.push(results[i]._group._id);

            TaskModel.find({ _group : { $in: groupIdList }, completed_for: { "$ne" : req.session.user.id } }).populate({
                    path: '_group',
                    select: 'name url_id'
                })
                .sort({deadline: 'asc'})
                .exec(function (err, results) {
                    if ((err)) {
                        console.error(err);
                        return next();
                    }

                    let tomorrow = new Date(Date.now());
                    tomorrow.setDate(tomorrow.getDate() +1);
                    let week = new Date(Date.now());
                    week.setDate(tomorrow.getDate() +7);

                    for (let i = 0; i < results.length; ++i){
                        if (results[i].deadline > new Date(Date.now())){
                            if (results[i].deadline < tomorrow){
                                res.locals.todayTaskList.push(results[i]);
                            }
                            else if (results[i].deadline < week){
                                res.locals.weekTaskList.push(results[i]);
                            }
                        }
                    }

                    return next();
                });
        });
    }
};