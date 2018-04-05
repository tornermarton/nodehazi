module.exports = function (objectrepository) {
    return function (req, res, next) {
        req.session.destroy(function (err) {
            return res.redirect('/');
        });
    };

};