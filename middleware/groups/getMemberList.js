const requireOption = require('../common').requireOption;

module.exports = function (objectRepository) {

    const GroupModel = requireOption(objectRepository,'groupModel');
    const MemberModel = requireOption(objectRepository, 'memberModel');

    return function (req, res, next) {

        res.locals.memberList = [];

        GroupModel.findOne({ url_id : req.params.id }, function (err, result) {
            if (err) console.error(err);

            //load member list
            MemberModel.find({_group: result._id}).populate({
                path: '_user',
                select: '_id firstname lastname'
            })
            .sort({firstname: 'asc'})
            .exec(function (err, results) {
                if ((err)) {
                    console.error(err);
                    return next();
                }

                for (let i = 0; i < results.length; ++i)
                    res.locals.memberList[i] = {id: results[i]._user._id, firstname: results[i]._user.firstname, lastname: results[i]._user.lastname};

                return next();
            });
        });
    }
};