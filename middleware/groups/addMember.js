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

            //add membership
            let newMembership = new MemberModel();
            newMembership._group = result._id;
            newMembership._user = req.body.user_id;

            newMembership.save(function (err) {
                if (err) console.error(err);
                res.json({
                    success: true,
                    error: null
                });
                res.end();
            });
        });


    };

};