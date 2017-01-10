import AuthStore from '../src/stores/AuthStore';
import * as authAPI from '../src/apis/authAPI';

describe('AuthStore', () => {

    beforeEach(() => {
        spyOn(authAPI, 'getLoggedInUser');
    });

    describe('constructor', () => {

        it('should get the current user\'s info', () => {
            const authStore = new AuthStore();

            expect(authAPI.getLoggedInUser).toHaveBeenCalled();
        });

        describe('when the user is logged in', () => {

            it('should set the user\'s uid and admin state', () => {
                const uid = 'spiderUid';
                const isAdmin = false;
                authAPI.getLoggedInUser.and.callFake(cb => cb({uid, isAdmin}));

                const authStore = new AuthStore();

                expect(authStore._uid).toEqual(uid);
                expect(authStore._isAdmin).toEqual(isAdmin);
            });
        });

        describe('when the user is logged out', () => {

            it('should set null uid and admin:false', () => {
                authAPI.getLoggedInUser.and.callFake(cb => cb(null));

                const authStore = new AuthStore();

                expect(authStore._uid).toEqual(null);
                expect(authStore._isAdmin).toBe(false);
            });
        });

    });
});
