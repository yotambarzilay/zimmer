import _ from 'lodash';
import firebase from './firebase';

export function getWords() {
  return firebase.database().ref('words').once('value').then(snapshot => snapshot.val());
}

export function trackChanges(onChange) {
  var dataRef = firebase.database().ref('words');
  _.forEach(['first', 'second'], (collection) => {
    var collectionRef = dataRef.child(collection);

    collectionRef.orderByPriority().startAt(Date.now()).on('child_added', function (snapshot) {
      onChange({
        collection,
        type: 'update',
        key: snapshot.key,
        val: snapshot.val()
      });
    });

    collectionRef.on('child_changed', function (snapshot) {
      onChange({
        collection,
        type: 'update',
        key: snapshot.key,
        val: snapshot.val()
      });
    });

    collectionRef.on('child_removed', function (snapshot) {
      onChange({
        collection,
        type: 'remove',
        key: snapshot.key,
        val: snapshot.val()
      });
    });

  });
}

export function convert(data) {
  return;
  var words = firebase.database().ref('words');
  _.forEach(['first', 'second'], function (col) {
    var ref = words.child(col);
    _.forEach(data[col], (v) => addWord(col, v))
  });
}

export function addWord(collection, word) {
  var newRef = firebase.database().ref('words').child(collection).push();
  newRef.setWithPriority(word, Date.now());
}

export function updateWord(collection, word, key) {
  firebase.database().ref('words').child(collection).update({[key]: word})
}

export function deleteWord(collection, key) {
  firebase.database().ref('words').child(collection).child(key).remove();
}
