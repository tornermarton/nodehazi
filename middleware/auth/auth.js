module.exports = function (objectRepository) {

    return function (req, res, next) {
        if (typeof req.session.userId === 'undefined') {
            return res.redirect('/');
        }
        else{
            res.locals.user = req.session.user;
        }
        return next();
    };

};