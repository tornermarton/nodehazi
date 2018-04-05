module.exports = function (objectrepository) {
    return function (req, res, next) {
        req.session.userId = '0001';
        req.session.user = {
            id: ''+req.session.userId,
            firstName: 'Miklós',
            lastName: 'Minta'
        };

        return res.redirect('/');
    };

};