const expect = require('chai').expect;
const authMW = require('../middleware/auth/auth');

describe('auth middleware ',function () {
    it("should redirect to / if req.session.userId is undefined (doesn't exist = logged out)", function (done) {
        const req = {
            session: {
                userId : undefined
            }
        };

        const res = {
            redirect : function (to) {
                expect(to).to.be.eql('/');
                done();
            }
        };

        authMW({})(req,res,function (err) {
            expect(true).to.be.eql(false);
            done();
        });
    });

    it("should call next() and set res.locals.user if req.session.userId is not undefined (exists = logged in)", function (done) {
        const req = {
            session: {
                userId : 123456789,
                user : {
                    name : 'asd'
                }
            }
        };

        const res = {
            redirect : function (to) {
                expect(true).to.be.eql(false);
                done();
            },
            locals :{
                user : {}
            }
        };

        authMW({})(req,res,function (err) {
            expect(res.locals.user).to.be.eql(req.session.user);
            expect(err).to.be.eql(undefined);
            done();
        });
    });
});