import _ from 'lodash';
import { observable, asMap, action, computed, toJS } from 'mobx';
import { getWords, trackChanges, addWord, updateWord, deleteWord } from 'apis/wordsAPI';

class WordsStore {
  @observable first;
  @observable second;
  @observable filterFirst;
  @observable filterSecond;


  constructor () {
    this.first = asMap({});
    this.second = asMap({});

    this.filterFirst = '';
    this.filterSecond = '';

    _.bindAll(this);

    getWords().then(this.setWords)
    trackChanges(this.onChange);
  }

  @action setFilterFirst = (filter) => {
    this.filterFirst = filter;
  }

  @action setFilterSecond = (filter) => {
    this.filterSecond = filter;
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
    return _.pickBy(toJS(this.first), (word) => _.includes(word, this.filterFirst));
  }

  @computed get getSecond () {
    return _.pickBy(toJS(this.second), (word) => _.includes(word, this.filterSecond));
  }

    addWord = addWord;

    updateWord = updateWord;

    deleteWord = deleteWord;
}

export default new WordsStore();
