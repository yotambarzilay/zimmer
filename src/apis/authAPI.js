import * as clientDB from './clientDB';

const getAdminStatus = (uid, cb) => {
	return clientDB.read('admins/' + uid, (isAdmin) => cb(!!isAdmin));
};

const getUserInfo = (user, cb) => {
	return getAdminStatus(user.uid, isAdmin => {
		cb({ uid: user.uid, isAdmin });
	});
};

export function listenToAuthChange(cb) {
	clientDB.listenToAuthChange(user => {
		if (user) {
			getUserInfo(user, cb);
		} else {
			cb(null);
		}
	});
}

export function loginWithGoogle() {
	clientDB.loginWithGoogle();
}

export function logout() {
	return clientDB.logout();
}
