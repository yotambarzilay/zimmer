const test = require('tape');

import * as wordsAPI from '../src/apis/wordsAPI';

test('shoa', (t) => {
    t.plan(2);

    wordsAPI.getWords().then((words) => {
        t.deepEqual(words, {first: {a: 'word!'}});

        wordsAPI.addWord('first', 'shoa');

        wordsAPI.getWords().then((words) => {
            t.deepEqual(words, {first: {a: 'word!', 'word-1': 'shoa'}});
        });
    });
});
