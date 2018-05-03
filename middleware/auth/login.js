const requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {
    const UserModel = requireOption(objectrepository,'userModel');

    return function (req, res, next) {
        //not enough parameter
        if ((typeof req.body === 'undefined') ||
            (typeof req.body.email === 'undefined') ||
            (typeof req.body.password === 'undefined')
        ) {
            res.json({
                success: false,
                error: "NotEnoughParameters"
            });
            res.end();
            return;
        }

        UserModel.findOne({
            email: req.body.email
        },
        function (err, result) {
            if ((err) || (!result)) {
                res.json({
                    success: false,
                    error: "NotRegistered"
                });
                res.end();
                return;
            }

            //check password
            if (result.password !== req.body.password) {
                res.json({
                    success: false,
                    error: "WrongPassword"
                });
                res.end();
                return;
            }

            //login is ok
            req.session.userId = result._id;
            req.session.user = {
                id: ''+req.session.userId,
                firstName: result.firstname,
                lastName: result.lastname,
                status: result.status,
            };

            res.json({
                success: true,
                error: null
            });
            res.end();
            return;
        });
    };

};