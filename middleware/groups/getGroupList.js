const requireOption = require('../common').requireOption;

module.exports = function (objectRepository) {
    const MemberModel = requireOption(objectRepository, 'memberModel');

    return function (req, res, next) {

        req.session.groupList = [];

        //load group list
        MemberModel.find({_user: req.session.userId}).populate({
            path: '_group',
            select: 'name url_id'
        }).exec(function (err, results) {
            if ((err)) {
                console.error(err);
                return next();
            }

            for (let i = 0; i < results.length; ++i)
                req.session.groupList[i] = {url_id: results[i]._group.url_id, name: results[i]._group.name};

            res.locals.groupList = req.session.groupList;

            return next();
        });
    }
}