const requireOption = require('../common').requireOption;

module.exports = function (objectRepository) {
    const GroupModel = requireOption(objectRepository,'groupModel');

    return function (req, res, next) {
        if ((typeof req.body === 'undefined') ||
            (typeof req.body.groupName === 'undefined') ||
            (typeof req.body.groupDescription === 'undefined')
        ) {
            res.json({
                success: false,
                error: "NotEnoughParameters"
            });
            res.end();
            return;
        }

        GroupModel.update(
            { url_id : req.params.id },
            { name: req.body.groupName , description: req.body.groupDescription },
            function (err) {
                if (err) console.error(err);

                return res.redirect('/groups/'+ req.params.id);
            }
        );
    };

};