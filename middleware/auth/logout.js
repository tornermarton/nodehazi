module.exports = function (objectRepository) {
    return function (req, res, next) {
        req.session.destroy(function (err) {
            return res.redirect('/');
        });
    };

};