module.exports = function (objectRepository) {

    return function (req, res, next) {
        if (req.session.user.status !== 1) {
            return res.redirect('/');
        }
        return next();
    };

};