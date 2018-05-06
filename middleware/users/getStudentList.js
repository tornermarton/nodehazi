const requireOption = require('../common').requireOption;

module.exports = function (objectRepository) {

    const GroupModel = requireOption(objectRepository,'groupModel');
    const UserModel = requireOption(objectRepository,'userModel');
    const MemberModel = requireOption(objectRepository,'memberModel');

    return function (req, res, next) {
        GroupModel.findOne({ url_id : req.params.id }, function (err, result) {
            if (err) console.error(err);

            //load member list
            MemberModel.find({_group: result._id}).populate({
                path: '_user',
                select: '_id'
            }).exec(function (err, results) {
                if ((err)) {
                    console.error(err);
                    return next();
                }

                let memberIdList = [];

                for (let i = 0; i < results.length; ++i)
                    memberIdList.push(results[i]._user._id);

                UserModel.find({ status : 0, _id : { $nin: memberIdList } })
                    .select('_id firstname lastname')
                    .sort('-firstname')
                    .exec(function (err, results) {
                        if ((err)) {
                            console.error(err);
                            return next();
                        }

                        res.locals.studentList = [];

                        for (let i = 0; i < results.length; ++i)
                            res.locals.studentList.push({id: results[i]._id, firstname: results[i].firstname, lastname: results[i].lastname});

                        return next();
                });
            });
        });
    };

};