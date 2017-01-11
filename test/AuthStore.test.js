import {autorun, isAction} from 'mobx';
import AuthStore from '../src/stores/AuthStore';

describe('AuthStore', () => {

    it('isLogged in should be false by default', () => {
        const authStore = new AuthStore();

        expect(authStore.isLoggedIn).toBe(false);
    })

    it('isAdmin should be false by default', () => {
        const authStore = new AuthStore();

        expect(authStore.isAdmin).toBe(false);
    });

    it('should update isLoggedIn and is admin:false', () => {
        const authStore = new AuthStore();

        let isLoggedIn = false;
        let isAdmin = false;

        const dispose = autorun(() => {
            isLoggedIn = authStore.isLoggedIn;
            isAdmin = authStore.isAdmin;
        });

        authStore.setUserInfo({uid: 'someUid', isAdmin: false});

        expect(isLoggedIn).toBe(true);
        expect(isAdmin).toBe(false);

        dispose();
    });

    it('should update isLoggedIn and is admin:true', () => {
        const authStore = new AuthStore();

        let isLoggedIn = false;
        let isAdmin = false;

        const dispose = autorun(() => {
            isLoggedIn = authStore.isLoggedIn;
            isAdmin = authStore.isAdmin;
        });

        authStore.setUserInfo({uid: 'spiderUid', isAdmin: true});

        expect(isLoggedIn).toBe(true);
        expect(isAdmin).toBe(true);

        dispose();
    });

    it('should clear isLoggedIn and isAdmin when user logs out', () => {
        const authStore = new AuthStore();

        let isLoggedIn = false;
        let isAdmin = false;

        const dispose = autorun(() => {
            isLoggedIn = authStore.isLoggedIn;
            isAdmin = authStore.isAdmin;
        });

        authStore.setUserInfo({uid: 'spiderUid', isAdmin: true});

        expect(isLoggedIn).toBe(true);
        expect(isAdmin).toBe(true);

        authStore.setUserInfo(null);

        expect(isLoggedIn).toBe(false);
        expect(isAdmin).toBe(false);

        dispose();
    });

    it('setUserInfo should be a mobx action', () => {
        const authStore = new AuthStore();

        expect(isAction(authStore.setUserInfo)).toBe(true);
    })
});
