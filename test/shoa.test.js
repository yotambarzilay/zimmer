const test = require('tape');
const shoa = require('../src/shoa').shoa;

test('shoa', (t) => {

    t.equal(shoa(), 1, 'should be 1');
    t.equal(shoa(), 1, 'should be 1');

    // t.notEqual(shoa(), 1, 'should not be 1');
    t.equal(shoa(), 1, 'should be 1');

    t.end();
});
