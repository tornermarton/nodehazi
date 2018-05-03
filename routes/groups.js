//middlewares
const authMW = require('../middleware/auth/auth');
const membershipAuthMW = require('../middleware/auth/membershipAuth');
const teacherAuthMW = require('../middleware/auth/teacherAuth');
const addGroupMW = require('../middleware/groups/addGroup');
const renderMW = require('../middleware/render');

//models
const userModel = require('../models/users');
const groupModel = require('../models/groups');
const memberModel = require('../models/members');
const taskTypeModel = require('../models/task_types');
const taskModel = require('../models/tasks');

module.exports = function (app) {
    const objectRepository = {
        userModel: userModel,
        groupModel: groupModel,
        memberModel: memberModel,
        taskTypeModel: taskTypeModel,
        taskModel: taskModel
    };

    app.get('/groups/add',
        authMW(objectRepository),
        teacherAuthMW(objectRepository),
        renderMW(objectRepository,'addgroup')
    );

    app.post('/groups/add',
        authMW(objectRepository),
        teacherAuthMW(objectRepository),
        addGroupMW(objectRepository)
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