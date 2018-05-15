const expect = require('chai').expect;
const loginMW = require('../middleware/auth/login');

describe('login middleware ',function () {
    describe("should return success: false ", function () {
        describe("and error: NotEnoughParameters when ", function () {
            it("no parameter is given", function (done) {
                let dontcall = false;
                let success = true;
                let error = "WrongValue";

                const res = {
                    json: function (object) {
                        success = object.success;
                        error = object.error;
                    },
                    end: function () {
                        expect(dontcall).to.be.eql(false);
                        expect(success).to.be.eql(false);
                        expect(error).to.be.eql("NotEnoughParameters");
                        done();
                    }
                };

                const fakeUserModel = {
                    findOne: function (some, cb) {
                        dontcall = true;
                        cb();
                    }
                };

                loginMW({
                    userModel: fakeUserModel
                })({}, res, function (err) {
                    expect(true).to.be.eql(false);
                    done();
                });
            });

            it("no email is given", function (done) {
                let dontcall = false;
                let success = true;
                let error = "WrongValue";

                const req = {
                    body : {
                        password : "asd"
                    }
                };

                const res = {
                    json: function (object) {
                        success = object.success;
                        error = object.error;
                    },
                    end: function () {
                        expect(dontcall).to.be.eql(false);
                        expect(success).to.be.eql(false);
                        expect(error).to.be.eql("NotEnoughParameters");
                        done();
                    }
                };

                const fakeUserModel = {
                    findOne: function (some, cb) {
                        dontcall = true;
                        cb();
                    }
                };

                loginMW({
                    userModel: fakeUserModel
                })(req, res, function (err) {
                    expect(true).to.be.eql(false);
                    done();
                });
            });

            it("no password is given", function (done) {
                let dontcall = false;
                let success = true;
                let error = "WrongValue";

                const req = {
                    body : {
                        email : "asd@asd.hu"
                    }
                };

                const res = {
                    json: function (object) {
                        success = object.success;
                        error = object.error;
                    },
                    end: function () {
                        expect(dontcall).to.be.eql(false);
                        expect(success).to.be.eql(false);
                        expect(error).to.be.eql("NotEnoughParameters");
                        done();
                    }
                };

                const fakeUserModel = {
                    findOne: function (some, cb) {
                        dontcall = true;
                        cb();
                    }
                };

                loginMW({
                    userModel: fakeUserModel
                })(req, res, function (err) {
                    expect(true).to.be.eql(false);
                    done();
                });
            });
        });

        describe("and error: NotRegistered when ", function () {
            it("email is not found in database", function (done) {
                let success = true;
                let error = "WrongValue";

                const req = {
                    body : {
                        email : "asd@asd.hu",
                        password: "asd"
                    }
                };

                const res = {
                    json: function (object) {
                        success = object.success;
                        error = object.error;
                    },
                    end: function () {
                        expect(success).to.be.eql(false);
                        expect(error).to.be.eql("NotRegistered");
                        done();
                    }
                };

                const fakeUserModel = {
                    findOne: function (some, cb) {
                        return cb(undefined, null);
                    }
                };

                loginMW({
                    userModel: fakeUserModel
                })(req, res, function (err) {
                    expect(true).to.be.eql(false);
                    done();
                });
            })
        });

        describe("and error: WrongPassword when ", function () {
            it("email is found in database but password doesn't match", function (done) {
                let success = true;
                let error = "WrongValue";

                const req = {
                    body : {
                        email : "asd@asd.hu",
                        password: "dsa"
                    }
                };

                const res = {
                    json: function (object) {
                        success = object.success;
                        error = object.error;
                    },
                    end: function () {
                        expect(success).to.be.eql(false);
                        expect(error).to.be.eql("WrongPassword");
                        done();
                    }
                };

                const fakeUserModel = {
                    findOne: function (some, cb) {
                        return cb(undefined, {
                            email : "asd@asd.hu",
                            password : "asd"
                        });
                    }
                };

                loginMW({
                    userModel: fakeUserModel
                })(req, res, function (err) {
                    expect(true).to.be.eql(false);
                    done();
                });
            })
        });
    });

    describe("should return {success: true, error: null}, set req.session.userId and req.session.user when ", function () {
        it("everything is OK", function (done) {
            let success = false;
            let error = "WrongValue";

            const result = {
                _id : 123456789,
                email : "asd@asd.hu",
                password : "asd",
                firstname: "asd",
                lastname: "asd",
                status: 1,
            };

            const req = {
                body : {
                    email : "asd@asd.hu",
                    password: "asd"
                },
                session : {
                    userId : 987654321,
                    user : {
                        id : 987654321,
                        firstName: "WrongValue",
                        lastName: "WrongValue",
                        status: 0,
                    }
                }
            };

            const res = {
                json: function (object) {
                    success = object.success;
                    error = object.error;
                },
                end: function () {
                    expect(success).to.be.eql(true);
                    expect(error).to.be.eql(null);
                    expect(req.session.userId).to.be.eql(result._id);
                    expect(req.session.user.firstName).to.be.eql(result.firstname);
                    expect(req.session.user.lastName).to.be.eql(result.lastname);
                    expect(req.session.user.status).to.be.eql(result.status);
                    done();
                }
            };

            const fakeUserModel = {
                findOne: function (some, cb) {
                    return cb(undefined, result);
                }
            };

            loginMW({
                userModel: fakeUserModel
            })(req, res, function (err) {
                expect(true).to.be.eql(false);
                done();
            });
        })
    });
});