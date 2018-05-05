const requireOption = require('../common').requireOption;

module.exports = function (objectRepository) {

    const GroupModel = requireOption(objectRepository,'groupModel');

    function generateUrlID(length) {
        let str = "";
        let collection = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < length; ++i)
            str += collection.charAt(Math.floor(Math.random() * collection.length));

        return str;
    }

    return function (req, res, next) {
        let urlID = generateUrlID(12);

        if ((typeof req.body === 'undefined') ||
            (typeof req.body.name === 'undefined') ||
            (typeof req.body.description === 'undefined')
        ) {
            res.json({
                success: false,
                error: "NotEnoughParameters"
            });
            res.end();
            return;
        }

        //create group
        let newGroup = new GroupModel();
        newGroup.url_id = urlID;
        newGroup._teacher = req.session.userId;
        newGroup.name = req.body.name;
        newGroup.description = req.body.description;


        newGroup.save(function (err) {
            if ((err)) {
                console.error(err);
                return next();
            }

            //save membership
            req.body.user_id = req.session.userId;
            req.body.group_id = newGroup._id;

            //add group to list
            req.session.groupList.push({ url_id: newGroup.url_id, name: newGroup.name});

            return next();
        });
    };

};