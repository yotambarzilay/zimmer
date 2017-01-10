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

export function getLoggedInUser() {
  return clientDB.getLoggedInUser().then(user => {
      if (user) {
          return getUserInfo(user);
      } else {
          return null;
      }
  })
}

export function logout() {
  return clientDB.logout();
}
