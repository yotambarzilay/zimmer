import firebase from 'apis/firebase';

const getAdminStatus = (uid) => {
  return firebase.database().ref('admins/' + uid)
    .once('value')
    .then(snapshot => !!snapshot.val());
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
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(result => result.user)
      .then(getUserInfo)
      .then(resolve)
      .catch(reject);
  })
}

export function getLoggedInUser() {
  return new Promise((resolve, reject) => {
    const onAuthStateChange = user => {
      firebase.auth().removeAuthTokenListener(onAuthStateChange);

      if (user) {
        getUserInfo(user).then(resolve);
      } else {
        resolve(null);
      }
    };
    firebase.auth().onAuthStateChanged(onAuthStateChange);
  });
}

export function logout() {
  return firebase.auth().signOut();
}
