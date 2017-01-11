import * as clientDB from './clientDB';

const getAdminStatus = (uid) => {
    return clientDB.read('admins/' + uid).then(isAdmin => !!isAdmin);
}

const getUserInfo = (user) => {
  if (!user) {
    return null;
  }

  return getAdminStatus(user.uid)
    .then(isAdmin => {
        return { uid: user.uid, isAdmin };
      })
}

export function loginWithGoogle() {
  return new Promise((resolve, reject) => {
    clientDB.loginWithGoogle()
      .then(getUserInfo)
      .then(resolve)
      .catch(reject);
  })
}

export function listenToAuthChange(cb) {
  clientDB.listenToAuthChange(user => {
      if (user) {
          getUserInfo(user).then((userInfo) => {
              cb(userInfo)
          });
      } else {
          cb(null);
      }
  });
}

export function logout() {
  return clientDB.logout();
}
