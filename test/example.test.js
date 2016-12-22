import * as wordsAPI from '../src/apis/wordsAPI';

describe('shoa', () => {

    it('get initial words', (done) => {
        wordsAPI.getWords().then((words) => {
            expect(words).toEqual({first: {a: 'word!'}});
            done();
        });
    });

    it('add word', (done) => {
        wordsAPI.addWord('first', 'shoa');

        wordsAPI.getWords().then((words) => {
            expect(words).toEqual({first: {a: 'word!', 'word-1': 'shoa'}});
            done();
        });
    });

});
