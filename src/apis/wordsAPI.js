import _ from 'lodash';
import firebase from './firebase';

const getWordsRef = () => firebase.database().ref('words');

export function getWords() {
  return getWordsRef().once('value').then(snapshot => snapshot.val());
}

export function trackChanges(onChange) {
  var wordsRef = getWordsRef();
  _.forEach(['first', 'second'], (collection) => {
    var collectionRef = wordsRef.child(collection);

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

export function addWord(collection, word) {
  var newRef = getWordsRef().child(collection).push();
  newRef.setWithPriority(word, Date.now());
}

export function updateWord(collection, word, key) {
  getWordsRef().child(collection).update({[key]: word})
}

export function deleteWord(collection, key) {
  getWordsRef().child(collection).child(key).remove();
}
