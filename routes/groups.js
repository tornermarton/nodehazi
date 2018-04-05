var authMW = require('../middleware/auth/auth');
var membershipAuthMW = require('../middleware/auth/membershipAuth');
var teacherAuthMW = require('../middleware/auth/teacherAuth');
var renderMW = require('../middleware/render');

module.exports = function (app) {
    var objectRepository = {};

    app.get('/groups/add',
        authMW(objectRepository),
        renderMW(objectRepository,'addgroup')
    );

    app.get('/groups/:id',
        authMW(objectRepository),
        membershipAuthMW(objectRepository),
        renderMW(objectRepository,'groups/tasks')
    );

    app.get('/groups/:id/members',
        authMW(objectRepository),
        membershipAuthMW(objectRepository),
        renderMW(objectRepository,'groups/members')
    );

    app.get('/groups/:id/teacher',
        authMW(objectRepository),
        membershipAuthMW(objectRepository),
        teacherAuthMW(objectRepository),
        renderMW(objectRepository,'groups/teacher')
    );
};