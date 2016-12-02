import { observable, computed, action } from 'mobx';
import { loginWithGoogle, getLoggedInUser, logout } from 'apis/authAPI';

class AuthStore {
    @observable _uid;
    @observable _isAdmin;


    constructor () {
        getLoggedInUser().then(this.onUserChanged)
    }

    @computed get isLoggedIn() {
        return !!this._uid;
    }

    @computed get isAdmin() {
      return !!this._isAdmin;
    }

    @action onUserChanged = (user) => {
        if (user) {
            this._uid = user.uid;
            this._isAdmin = user.isAdmin;
        } else {
            this._uid = null;
            this._isAdmin = false;
        }
    };

    login = () => {
        loginWithGoogle().then(this.onUserChanged);
    };

    logout = () => {
      logout().then(this.onUserChanged);
    }
}

const authStore = new AuthStore();

export default authStore;
