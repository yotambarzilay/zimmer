import firebase from './firebase';

export function listenToChildAdded(path, onChildAdded) {
    firebase.database().ref(path).orderByPriority().startAt(Date.now()).on('child_added', (snapshot) => onChildAdded(snapshot.val(), snapshot.key));
}

export function listenToChildChanged(path, onChildChanged) {
    firebase.database().ref(path).on('child_changed', (snapshot) => onChildChanged(snapshot.val(), snapshot.key));
}

export function listenToChildRemoved(path, onChildRemoved) {
    firebase.database().ref(path).on('child_removed', (snapshot) => onChildRemoved(snapshot.val(), snapshot.key));
}

export function read(path) {
    return firebase.database().ref(path).orderByPriority().once('value').then(snapshot => snapshot.val());
}

export function push(path, data) {
    firebase.database().ref(path).push().setWithPriority(data, Date.now());
}

export function update(path, key, data) {
    firebase.database().ref(path).update({[key]: data});
}

export function remove(path) {
    firebase.database().ref(path).remove();
}

export function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
        .then(result => result.user)
}

export function getLoggedInUser() {
    return new Promise((resolve) => {
        const onAuthStateChange = user => {
            firebase.auth().removeAuthTokenListener(onAuthStateChange);

            resolve(user);
        };

        firebase.auth().onAuthStateChanged(onAuthStateChange);
    });
}

export function logout() {
    return firebase.auth().signOut();
}