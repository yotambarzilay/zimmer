import _ from 'lodash';
import * as authAPI from '../src/apis/authAPI';
import * as clientDB from '../src/apis/clientDB';

xdescribe('authAPI', () => {

    describe('listenToAuthChange', () => {

        it('should listen to db auth change', () => {
            authAPI.listenToAuthChange();

            expect(clientDB.listenToAuthChange).toHaveBeenCalled();
        });

        it('should invoke callback with null when user is logged out', () => {
            const onAuthChangeCallback = jasmine.createSpy('onAuthChangeCallback');
            let userChangeCb;

            clientDB.listenToAuthChange.and.callFake((cb) => {
                userChangeCb = cb;
            });

            authAPI.listenToAuthChange(onAuthChangeCallback);
            userChangeCb();
            expect(onAuthChangeCallback).toHaveBeenCalledWith(null);
        });

        xdescribe('when user is admin', () => {

            it('should invoke callback with uid and isAdmin:false', (done) => {
                const uid = 'spiderPigUid';
                const isAdmin = false;
                const onAuthChangeCallback = jasmine.createSpy('onAuthChangeCallback');

                clientDB.read.and.callFake(() => {
                    console.log('shoa');
                    return Promise.resolve(isAdmin)
                });

                clientDB.listenToAuthChange.and.callFake((cb) => {
                    _.defer(() => {
                        cb({uid});

                        expect(onAuthChangeCallback).toHaveBeenCalledWith({uid, isAdmin});

                        done();

                    });
                });

                authAPI.listenToAuthChange(onAuthChangeCallback);
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
