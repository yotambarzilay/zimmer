import _ from 'lodash';
import React from 'react';
import { observer } from 'mobx-react';

import authStore from '../stores/authStore';
import { addWord, updateWord, deleteWord } from '../apis/wordsAPI';

import template from './Admin.rt';

@observer class Admin extends React.Component {
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

export default Admin;
