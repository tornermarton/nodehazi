//middlewares
const authMW = require('../middleware/auth/auth');
const loginMW = require('../middleware/auth/login');
const registrationMW = require('../middleware/auth/registration');
const logoutMW = require('../middleware/auth/logout');
const inverseAuthMW = require('../middleware/auth/inverseAuth');
const getGroupListMW = require('../middleware/groups/getGroupList');
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

    app.get('/',
        function (req, res, next) {
            if (typeof req.session.userId === 'undefined') {
                res.render('login');
                return res.end();                               //ha nincs bejelentkezve csak a bejelentkezo oldalt lathatja (auth pedig ide iranyitja)
            }
            next();
        },
        authMW(objectRepository),
        getGroupListMW(objectRepository),
        renderMW(objectRepository,'homepage')
    );

    app.post('/auth/login',
        inverseAuthMW(objectRepository),
        loginMW(objectRepository)
    );

    app.post('/auth/register',
        inverseAuthMW(objectRepository),
        registrationMW(objectRepository)
    );

    app.use('/auth/logout',
        authMW(objectRepository),
        logoutMW(objectRepository)
    );
};
