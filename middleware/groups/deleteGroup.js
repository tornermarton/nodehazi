const requireOption = require('../common').requireOption;

module.exports = function (objectRepository) {

    const GroupModel = requireOption(objectRepository,'groupModel');
    const MemberModel = requireOption(objectRepository,'memberModel');

    return function (req, res, next) {

        GroupModel.findOne({ url_id : req.params.id }, function (err, result){
            if (err) console.error(err);

            GroupModel.remove( { _id : result._id }, function (err) {
                if (err) console.error(err);

                MemberModel.remove( { _group : result._id }, function (err) {
                    if (err) console.error(err);

                    return res.redirect('/');
                });
            });
        });
    };

};