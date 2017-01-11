import _ from 'lodash';
import { observable, asMap, action, computed, toJS } from 'mobx';

class WordsStore {
  @observable first = asMap({});
  @observable second = asMap({});
  @observable filterFirst = '';
  @observable filterSecond = '';

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

}

export default WordsStore;
