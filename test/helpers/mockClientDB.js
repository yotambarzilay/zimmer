/*eslint-disable jasmine/no-global-setup*/
const _ = require('lodash');
const clientDB = require('../../src/apis/clientDB');

beforeEach(() => {
	_(clientDB)
		.keys()
		.forEach((key) => spyOn(clientDB, key));
});