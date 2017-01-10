import _ from 'lodash';
import * as authAPI from '../src/apis/authAPI';
import * as clientDB from '../src/apis/clientDB';

describe('authAPI', () => {

    describe('getLoggedInUser', () => {

        it('should return null if not logged in', (done) => {
            clientDB.getLoggedInUser.and.callFake(() => {
                return new Promise(res => {
                    _.defer(() => res(null))
                });
            });

            authAPI.getLoggedInUser((user) => {
                expect(user).toEqual(null);
                expect(user).toEqual(null);

                done();
            });
        });

        describe('if user logged in and not admin', () => {

            it('should return an object with the uid and isAdmin:false', (done) => {
                const uid = 'someUserId';

                clientDB.getLoggedInUser.and.callFake(() => {
                    return new Promise(res => {
                        _.defer(() => res({uid}))
                    });
                });

                clientDB.read.and.callFake(() => {
                    return new Promise(res => {
                        _.defer(() => res(false));
                    });
                });

                authAPI.getLoggedInUser((user) => {
                    expect(user).toEqual({uid, isAdmin: false});
                    expect(clientDB.read).toHaveBeenCalledWith(`admins/${uid}`);

                    done();
                });
            });

        });

        describe('if user logged in and is admin', () => {

            it('should return an object with the uid and isAdmin:true', (done) => {
                const uid = 'someUserId';

                clientDB.getLoggedInUser.and.callFake(() => {
                    return new Promise(res => {
                        _.defer(() => res({uid}))
                    });
                });

                clientDB.read.and.callFake(() => {
                    return new Promise(res => {
                        _.defer(() => res(true));
                    });
                });

                authAPI.getLoggedInUser((user) => {
                    expect(user).toEqual({uid, isAdmin: true});
                    expect(clientDB.read).toHaveBeenCalledWith(`admins/${uid}`);

                    done();
                });
            });

        });

    });

    describe('logout', () => {

        it('should logout', (done) => {
            clientDB.logout.and.callFake(() => {
                return new Promise(res => {
                    _.defer(() => res());
                });
            });

            authAPI.logout().then(() => {
                expect(clientDB.logout).toHaveBeenCalled();

                done();
            })
        });

    });

    describe('loginWithGoogle', () => {

        it('should resolve with an object containing the uid', (done) => {
            const uid = 'someUid';

            clientDB.loginWithGoogle.and.callFake(() => {
                return new Promise(res => {
                    _.defer(() => res({uid}))
                })
            });

            clientDB.read.and.callFake(() => {
                return new Promise(res => {
                    _.defer(() => res(false))
                })
            });

            authAPI.loginWithGoogle().then(user => {
                expect(user.uid).toEqual(uid);

                done();
            });
        });

        describe('when user is admin', () => {

            it('should resolve with isAdmin:true', (done) => {
                const uid = 'someUid';

                clientDB.loginWithGoogle.and.callFake(() => {
                    return new Promise(res => {
                        _.defer(() => res({uid}))
                    })
                });

                clientDB.read.and.callFake(() => {
                    return new Promise(res => {
                        _.defer(() => res(true))
                    })
                });

                authAPI.loginWithGoogle().then(user => {
                    expect(user.isAdmin).toBe(true);
                    expect(clientDB.read).toHaveBeenCalledWith(`admins/${uid}`);

                    done();
                });
            });
        });

        describe('when user is not admin', () => {

            it('should resolve with isAdmin:true', (done) => {
                const uid = 'someUid';

                clientDB.loginWithGoogle.and.callFake(() => {
                    return new Promise(res => {
                        _.defer(() => res({uid}))
                    })
                });

                clientDB.read.and.callFake(() => {
                    return new Promise(res => {
                        _.defer(() => res(false))
                    })
                });

                authAPI.loginWithGoogle().then(user => {
                    expect(user.isAdmin).toBe(false);
                    expect(clientDB.read).toHaveBeenCalledWith(`admins/${uid}`);

                    done();
                });
            });
        });

        it('should resolve with null on login failure', (done) => {
            clientDB.loginWithGoogle.and.callFake(() => {
                return new Promise(res => {
                    _.defer(() => res(null));
                });
            });

            authAPI.loginWithGoogle().then(user => {
                expect(user).toBe(null);
                expect(clientDB.read).not.toHaveBeenCalled();

                done();
            });
        });

    });
});
