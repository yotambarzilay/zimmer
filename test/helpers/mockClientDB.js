const _ = require('lodash');
const clientDB = require('../../src/apis/clientDB');

let mockDbData = {words: {first: {a: 'word!'}}};

const toMockDbPath = (path) => path.split('/');

const mockClientDB = {
    listenToChildAdded: _.noop,
    listenToChildChanged: _.noop,
    listenToChildRemoved: _.noop,
    read: (path) => new Promise((res) => res(_.get(mockDbData, toMockDbPath(path)))),
    update: _.noop,
    remove: _.noop,
    push: (path, data) => {
        const id = _.uniqueId('word-');
        const dataPath = toMockDbPath(path).concat(id);
        _.set(mockDbData, dataPath, data)
    }
};

const unMockedMethods = _.difference(_.keys(clientDB), _.keys(mockClientDB));
if (!_.isEmpty(unMockedMethods)) {
    throw "mockClientDB | Missing mock methods for: " + unMockedMethods.join(', ');
}

_.assign(clientDB, mockClientDB);

module.exports = mockClientDB;