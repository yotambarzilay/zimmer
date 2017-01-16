import { observable, computed, action } from 'mobx';

class AuthStore {
	@observable _uid;
	@observable _isAdmin;

	@computed get isLoggedIn() {
		return !!this._uid;
	}

	@computed get isAdmin() {
		return !!this._isAdmin;
	}

	@action setUserInfo = (user) => {
		if (user) {
			this._uid = user.uid;
			this._isAdmin = user.isAdmin;
		} else {
			this._uid = null;
			this._isAdmin = false;
		}
	};

}

export default AuthStore;
