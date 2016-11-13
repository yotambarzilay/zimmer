import _ from 'lodash';
import React from 'react';
import { observer } from 'mobx-react';

import wordsStore from '../stores/wordsStore';
import { addWord, updateWord, deleteWord } from '../apis/wordsAPI';

import template from './Admin.rt';


export default @observer class Admin extends React.Component {

  getFirst () {
    return _.map(wordsStore.getFirst, (word, key) => ({ word, key })).reverse();
  }

  getSecond () {
    return _.map(wordsStore.getSecond, (word, key) => ({ word, key })).reverse();
  }

  addFirst = (word) => {
    addWord('first', word);
  }

  updateFirst = (word, key) => {
    updateWord('first', word, key);
  }

  removeFirst = (key) => {
    deleteWord('first', key);
  }

  addSecond = (word) => {
    addWord('second', word);
  }

  updateSecond = (word, key) => {
    updateWord('second', word, key);
  }

  removeSecond = (key) => {
    deleteWord('second', key);
  }

  render () {
    return template.apply(this);
  }
}
