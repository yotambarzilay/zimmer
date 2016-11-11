import { observable, computed, action } from 'mobx';
import { loginWithGoogle, getLoggedInUser, logout } from '../api/authAPI';

class AuthStore {
    @observable uid;
    @observable isAdmin;


    constructor () {
        getLoggedInUser().then(this.onUserChanged)
    }

    @computed get isLoggedIn() {
        return !!this.uid;
    }

    @computed get isAdmin() {
      return this.isAdmin;
    }

    @action onUserChanged = (user) => {
        if (user) {
            this.uid = user.uid;
            this.photoURL = user.photoURL;
            this.userName = user.userName;
        } else {
            this.uid = null;
            this.photoURL = null;
            this.userName = null;
        }
    };

    login = () => {
        loginWithGoogle().then(this.onUserChanged);
    };

    logout = () => {
        logout().then(this.onUserChanged)
    }
}

const authStore = new AuthStore();

window.authStore = authStore;

export default authStore;
