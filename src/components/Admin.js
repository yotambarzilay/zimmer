import _ from 'lodash';
import React from 'react';
import { observer } from 'mobx-react';

import wordsStore from '../stores/wordsStore';
import authStore from '../stores/authStore';
import { addWord, updateWord, deleteWord } from '../apis/wordsAPI';

import RemovableTextInput from './RemovableTextInput/RemovableTextInput';

export default @observer
class Admin extends React.Component {

  getFirst () {
    return _.map(wordsStore.getFirst, (word, key) => ({ word, key })).reverse();
  }

  getSecond () {
    return _.map(wordsStore.getSecond, (word, key) => ({ word, key })).reverse();
  }

  setFilterFirst (filter) {
    wordsStore.setFilterFirst(filter);
  }

  setFilterSecond (filter) {
    wordsStore.setFilterSecond(filter);
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

  renderListItems = (wordObjs, onSubmit, onDelete) => {
    return _.map(wordObjs, ({key, word}) => {
      return (
        <li key={key}>
          <RemovableTextInput label={word}
                              id={key}
                              onSubmit={onSubmit}
                              onDelete={onDelete}
                              submitLabel="v"
              />
        </li>
      );
    });
  }

  render () {
    return (
      <div>
        {!authStore.isLoggedIn && <button onClick={authStore.login}>התחבר</button>}
        {authStore.isLoggedIn && <button onClick={authStore.logout}>התנתק</button>}
        {authStore.isLoggedIn && !authStore.isAdmin && <h3>התה לא הדמין</h3>}
        {authStore.isAdmin &&
          <div className="listsContainer">
            <div className="list">
              <h3>מילה ראשונה</h3>
              <ul>
                <li>
                  <RemovableTextInput onSubmit={this.addFirst}
                                      clearOnSubmit={true}
                                      submitLabel="+"
                                      onChange={this.setFilterFirst}
                      />
                </li>
                {this.renderListItems(this.getFirst(), this.updateFirst, this.removeFirst)}

              </ul>
            </div>

            <div className="list">
              <h3>מילה שניה</h3>
              <ul>
                <li>
                  <RemovableTextInput onSubmit={this.addSecond}
                                      clearOnSubmit={true}
                                      submitLabel="+"
                                      onChange={this.setFilterSecond}
                      />
                </li>
                {this.renderListItems(this.getSecond(), this.updateSecond, this.removeSecond)}

              </ul>
            </div>

          </div>
        }
        </div>
    );
  }
}
