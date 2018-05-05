module.exports = function (objectRepository) {

    return function (req, res, next) {
        for (let i = 0; i < req.session.groupList.length ; ++i)
            if (req.session.groupList[i].url_id === req.params.id) {
                res.locals.actGroup = req.session.groupList[i];
                return next();
            }

        return res.redirect('/');
    };

};