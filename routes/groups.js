//middlewares
const authMW = require('../middleware/auth/auth');
const membershipAuthMW = require('../middleware/auth/membershipAuth');
const teacherAuthMW = require('../middleware/auth/teacherAuth');
const addGroupMW = require('../middleware/groups/addGroup');
const deleteGroupMW = require('../middleware/groups/deleteGroup');
const addMemberMW = require('../middleware/groups/addMember');
const removeMemberMW = require('../middleware/groups/removeMember');
const addTaskMW = require('../middleware/tasks/addTask');
const deleteTaskMW = require('../middleware/tasks/deleteTask');
const editTaskMW = require('../middleware/tasks/editTask');
const markTaskCompletedMW = require('../middleware/tasks/markTaskCompleted');
const changeGroupInfoMW = require('../middleware/groups/changeGroupInfo');
const getGroupListMW = require('../middleware/groups/getGroupList');
const getMemberListMW = require('../middleware/groups/getMemberList');
const getStudentListMW = require('../middleware/users/getStudentList');
const getTaskTypeListMW = require('../middleware/tasks/getTaskTypeList');
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
        getGroupListMW(objectRepository),
        teacherAuthMW(objectRepository),
        renderMW(objectRepository,'addgroup')
    );

    app.post('/groups/add',
        authMW(objectRepository),
        teacherAuthMW(objectRepository),
        addGroupMW(objectRepository),
        addMemberMW(objectRepository)
    );

    app.get('/groups/:id',
        authMW(objectRepository),
        getGroupListMW(objectRepository),
        membershipAuthMW(objectRepository),
        renderMW(objectRepository,'groups/tasks')
    );

    app.get('/groups/:id/members',
        authMW(objectRepository),
        getGroupListMW(objectRepository),
        membershipAuthMW(objectRepository),
        getMemberListMW(objectRepository),
        renderMW(objectRepository,'groups/members')
    );

    app.post('/groups/:id/tasks/:taskid/markcompleted',
        authMW(objectRepository),
        membershipAuthMW(objectRepository),
        markTaskCompletedMW(objectRepository)
    );

    app.get('/groups/:id/teacher',
        authMW(objectRepository),
        membershipAuthMW(objectRepository),
        teacherAuthMW(objectRepository),
        getGroupListMW(objectRepository),
        getTaskTypeListMW(objectRepository),
        renderMW(objectRepository,'groups/teacher')
    );

    app.post('/groups/:id/delete',
        authMW(objectRepository),
        membershipAuthMW(objectRepository),
        teacherAuthMW(objectRepository),
        deleteGroupMW(objectRepository)
    );

    app.post('/groups/:id/tasks/add',
        authMW(objectRepository),
        membershipAuthMW(objectRepository),
        teacherAuthMW(objectRepository),
        addTaskMW(objectRepository)
    );

    app.get('/groups/:id/members/add',
        authMW(objectRepository),
        membershipAuthMW(objectRepository),
        teacherAuthMW(objectRepository),
        getGroupListMW(objectRepository),
        getStudentListMW(objectRepository),
        renderMW(objectRepository,'groups/addMembers')
    );

    app.post('/groups/:id/members/add',
        authMW(objectRepository),
        membershipAuthMW(objectRepository),
        teacherAuthMW(objectRepository),
        addMemberMW(objectRepository)
    );

    app.post('/groups/:id/members/remove',
        authMW(objectRepository),
        membershipAuthMW(objectRepository),
        teacherAuthMW(objectRepository),
        removeMemberMW(objectRepository)
    );

    app.post('/groups/:id/changeinfo',
        authMW(objectRepository),
        membershipAuthMW(objectRepository),
        teacherAuthMW(objectRepository),
        changeGroupInfoMW(objectRepository)
    );
};