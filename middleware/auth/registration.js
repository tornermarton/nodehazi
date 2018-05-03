const requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    const UserModel = requireOption(objectrepository,'userModel');

    return function (req, res, next) {
        //not enough parameter
        if ((typeof req.body === 'undefined') ||
            (typeof req.body.firstname === 'undefined') ||
            (typeof req.body.lastname === 'undefined') ||
            (typeof req.body.email === 'undefined') ||
            (typeof req.body.password === 'undefined') ||
            (typeof req.body.status === 'undefined') ||
            (typeof req.body.DOByear === 'undefined') ||
            (typeof req.body.DOBmonth === 'undefined') ||
            (typeof req.body.DOBday === 'undefined')
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
        function(err, result){
            if ((err) || result !== null){
                res.json({
                    success: false,
                    error: "AlreadyRegistered"
                });
                res.end();
                return;
            }

            //create user
            let newUser = new UserModel();
            newUser.firstname = req.body.firstname;
            newUser.lastname = req.body.lastname;
            newUser.email = req.body.email;
            newUser.password = req.body.password;
            newUser.date_of_birth = new Date(parseInt(req.body.DOByear),parseInt(req.body.DOBmonth)-1,parseInt(req.body.DOBday),1,0,0,0);
            newUser.status = Number(parseInt(req.body.status));

            newUser.save(function (err) {
                if (err) console.error(err);
                res.setHeader('Content-Type', 'application/json');
                res.json({
                    success: true,
                    error: null
                });
                res.end();
            });
        });
    };

};