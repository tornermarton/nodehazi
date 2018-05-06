const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

/**
 * Static
 **/
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(session({
    secret: 'keyboard cat',
    cookie: {},
    resave: true,
    saveUninitialized: false
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

/**
 * Routes
 *
d * /                GET     főoldal: startpage (login+register), ha nincs bejelentkezve, ha be van akkor homepage       AuthMW-
 *
d * /auth/login           POST    bejelntkezés kezelése                                                                  LoginMW-
d * /auth/registration    POST    regisztráció kezelése                                                                  RegistrationMW-
d * /auth/logout          USE     kijelentkezés (ha van bejelentkezett felhasználó                                       LogoutMW-
 *
d * /group/:id           GET     az adott id-jű csoport főoldala                                                         MembershipAuthMW-
d * /groups/add          GET     új csoport hozzáadása form                                                              AddGroupMW-
d * /groups/add          POST    új csoport hozzáadása (beküldött form kezelése                                          (AddGroupMW)-
d * /groups/:id/members  GET     csoport tagjainak listája                                                               GetMemberListMW-
 *
d * /groups/:id/tasks/:taskid/markcompleted      POST    az adott task megjelölése elkészítettként                       MarkTaskCompletedMW-
 *
 * EZEK CSAK TANÁROKNAK ELÉRHETŐEK:                                                                                     TeacherAuthMW-
d * /groups/:id/teacher                  GET     csoport tanari oldala                                                   (TeacherAuthMW)-
d * /groups/:id/delete                   POST    csoport törlése                                                         DeleteGroupMW-
d * /groups/:id/tasks/add                POST    új feladat hozzáadása az adott csoportnak                               AddTaskMW-
d * /groups/:id/tasks/:taskid/delete     POST    task törlése                                                            DeleteTaskMW-
 * /groups/:id/tasks/:taskid/edit       GET     task szerkesztésének formja                                             EditTaskMW-
 * /groups/:id/tasks/:taskid/edit       POST    task szerkesztésének elmentése                                          (EditTaskMW)-
 *
d * /groups/:id/members/add              GET     diákok listája                                                          GetStudentListMW-
d * /groups/:id/members/add              POST    diák hozzáadása                                                         AddMemberMW-
d * /groups/:id/members/remove           POST    diák törlése a csoportból                                               RemoveMemberMW-
 *
d * /groups/:id/changeinfo               POST    csoport beállításainak elmentése (név, leírás, bármi egyéb felmerülő)   ChangeGroupInfoMW
 **/

require('./routes/home')(app);
require('./routes/groups')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;