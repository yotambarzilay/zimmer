import _ from 'lodash';
import * as clientDB from './clientDB';

export const trackChanges = (onChange) => {
  _.forEach(['first', 'second'], (collection) => {

    clientDB.listenToChildAdded('words/' + collection, (val, key) => {
        onChange({
            collection,
            type: 'update',
            key,
            val
        });
    });

      clientDB.listenToChildChanged('words/' + collection, (val, key) => {
          onChange({
              collection,
              type: 'update',
              key,
              val
          });
      });

      clientDB.listenToChildRemoved('words/' + collection, (val, key) => {
          onChange({
              collection,
              type: 'remove',
              key,
              val
          });
      });
  });
};

export const getWords = () => clientDB.read('words');

export const addWord = (collection, word) => clientDB.push('words/' + collection, word);

export const updateWord = (collection, word, key) => clientDB.update('words/' + collection, key, word);

export const deleteWord = (collection, key) => clientDB.remove('words/' + collection + '/' + key);
