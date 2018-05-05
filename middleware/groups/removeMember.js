const requireOption = require('../common').requireOption;

module.exports = function (objectRepository) {

    const GroupModel = requireOption(objectRepository,'groupModel');
    const MemberModel = requireOption(objectRepository,'memberModel');

    return function (req, res, next) {
        if ((typeof req.body === 'undefined') ||
            (typeof req.body.user_id === 'undefined')
        ) {
            res.json({
                success: false,
                error: "NotEnoughParameters"
            });
            res.end();
            return;
        }

        GroupModel.findOne({ url_id : req.params.id }, function (err, result){
            if (err) console.error(err);

            MemberModel.remove( { _group : result._id, _user : req.body.user_id }, function (err) {
                if (err) console.error(err);

                return res.redirect('/groups/'+req.params.id+'/members');
            });
        });
    };

};