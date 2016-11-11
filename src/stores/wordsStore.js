import _ from 'lodash';
import { observable, asMap, action, computed, toJS } from 'mobx';
import { getWords, trackChanges, addWord, convert } from '../apis/wordsAPI';

const arrToObj = (arr) => {
  return _.transform(arr, (obj, v, i) => {
    if (v) {
      obj[i] = v;
    }
  }, {})
}

class WordsStore {
  @observable first;
  @observable second;

  constructor () {
    this.first = asMap({});
    this.second = asMap({});

    _.bindAll(this);

    getWords().then(this.setWords)
    trackChanges(this.onChange);
  }

  @action onChange = ({collection, type, key, val}) => {
    switch (type) {
      case 'update':
        this[collection].set(key, val);
        break;
      case 'remove':
        this[collection].delete(key);
        break;
    }
  }

  @action setWords = (words) => {
    this.first.merge(words.first);
    this.second.merge(words.second);
  }

  @computed get getFirst () {
    return toJS(this.first);
  }

  @computed get getSecond () {
    return toJS(this.second);
  }
}

export default new WordsStore();
