import { observable } from 'mobx';

class WordsStore {
  @observable first;
  @observable second;

  constructor () {
    this.first = [];
    this.second = [];
  }
}

export default new WordsStore();
