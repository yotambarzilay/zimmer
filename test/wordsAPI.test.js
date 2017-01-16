import _ from 'lodash';
import * as wordsAPI from '../src/apis/wordsAPI';
import * as clientDB from '../src/apis/clientDB';

describe('wordsAPI', () => {

	describe('getWords', () => {

		it('should get words from the database', (done) => {
			const mockWords = { first: { some: 'firstWord' }, second: { another: 'secondWord' } };

			clientDB.read.and.callFake((path, cb) => {
				_.defer(() => cb(mockWords));
			});

			wordsAPI.getWords((words) => {
				expect(clientDB.read).toHaveBeenCalledWith('words', jasmine.any(Function));
				expect(words).toEqual(mockWords);

				done();
			});
		});

	});

	describe('addWord', () => {

		it('should add a word to first collection', () => {
			const newWord = 'someWord';

			wordsAPI.addWord('first', newWord);

			expect(clientDB.push).toHaveBeenCalledWith('words/first', newWord);
		});

		it('should add a word to second collection', () => {
			const newWord = 'someOtherWord';

			wordsAPI.addWord('second', newWord);

			expect(clientDB.push).toHaveBeenCalledWith('words/second', newWord);
		});

	});

	describe('updateWord', () => {

		it('should update a word in first collection', () => {
			const key = 'someKey';
			const updatedWord = 'someUpdatedWord';
			wordsAPI.updateWord('first', updatedWord, key);

			expect(clientDB.update).toHaveBeenCalledWith('words/first', key, updatedWord);
		});

		it('should update a word in second collection', () => {
			const key = 'someOtherKey';
			const updatedWord = 'someOtherUpdatedWord';
			wordsAPI.updateWord('second', updatedWord, key);

			expect(clientDB.update).toHaveBeenCalledWith('words/second', key, updatedWord);
		});

	});

	describe('deleteWord', () => {

		it('should remove a word from first collection', () => {
			const key = 'someKey';
			wordsAPI.deleteWord('first', key);

			expect(clientDB.remove).toHaveBeenCalledWith(`words/first/${key}`);
		});

		it('should remove a word from second collection', () => {
			const key = 'someOtherKey';
			wordsAPI.deleteWord('second', key);

			expect(clientDB.remove).toHaveBeenCalledWith(`words/second/${key}`);
		});

	});

	describe('trackChanges', () => {

		describe('first collection', () => {

			describe('child added', () => {

				it('should register to child added', () => {
					wordsAPI.trackChanges(_.noop);

					expect(clientDB.listenToChildAdded).toHaveBeenCalledWith('words/first', jasmine.any(Function));
				});

				it('on change callback should be invoked with added word info', () => {
					const changeCallback = jasmine.createSpy('changeCallback');

					wordsAPI.trackChanges(changeCallback);
					const dbListener = clientDB.listenToChildAdded.calls.argsFor(0)[1];

					dbListener('newWord', 'newWordKey');

					expect(changeCallback).toHaveBeenCalledWith({
						collection: 'first',
						type: 'update',
						key: 'newWordKey',
						val: 'newWord'
					});
				});
			});

			describe('child updated', () => {

				it('should register to child update', () => {
					wordsAPI.trackChanges(_.noop);

					expect(clientDB.listenToChildChanged).toHaveBeenCalledWith('words/first', jasmine.any(Function));
				});

				it('on change callback should be invoked with updated word info', () => {
					const changeCallback = jasmine.createSpy('changeCallback');

					wordsAPI.trackChanges(changeCallback);
					const dbListener = clientDB.listenToChildChanged.calls.argsFor(0)[1];

					dbListener('updateWord', 'updateWordKey');

					expect(changeCallback).toHaveBeenCalledWith({
						collection: 'first',
						type: 'update',
						key: 'updateWordKey',
						val: 'updateWord'
					});
				});
			});

			describe('child removed', () => {

				it('should register to child removed', () => {
					wordsAPI.trackChanges(_.noop);

					expect(clientDB.listenToChildRemoved).toHaveBeenCalledWith('words/first', jasmine.any(Function));
				});

				it('on change callback should be invoked with removed word info', () => {
					const changeCallback = jasmine.createSpy('changeCallback');

					wordsAPI.trackChanges(changeCallback);
					const dbListener = clientDB.listenToChildRemoved.calls.argsFor(0)[1];

					dbListener('removedWord', 'removedWordKey');

					expect(changeCallback).toHaveBeenCalledWith({
						collection: 'first',
						type: 'remove',
						key: 'removedWordKey',
						val: 'removedWord'
					});
				});
			});

		});

		describe('second collection', () => {

			describe('child added', () => {

				it('should register to child added', () => {
					wordsAPI.trackChanges(_.noop);

					expect(clientDB.listenToChildAdded).toHaveBeenCalledWith('words/second', jasmine.any(Function));
				});

				it('on change callback should be invoked with added word info', () => {
					const changeCallback = jasmine.createSpy('changeCallback');

					wordsAPI.trackChanges(changeCallback);
					const dbListener = clientDB.listenToChildAdded.calls.argsFor(1)[1];

					dbListener('newWord', 'newWordKey');

					expect(changeCallback).toHaveBeenCalledWith({
						collection: 'second',
						type: 'update',
						key: 'newWordKey',
						val: 'newWord'
					});
				});
			});

			describe('child updated', () => {

				it('should register to child update', () => {
					wordsAPI.trackChanges(_.noop);

					expect(clientDB.listenToChildChanged).toHaveBeenCalledWith('words/second', jasmine.any(Function));
				});

				it('on change callback should be invoked with updated word info', () => {
					const changeCallback = jasmine.createSpy('changeCallback');

					wordsAPI.trackChanges(changeCallback);
					const dbListener = clientDB.listenToChildChanged.calls.argsFor(1)[1];

					dbListener('updateWord', 'updateWordKey');

					expect(changeCallback).toHaveBeenCalledWith({
						collection: 'second',
						type: 'update',
						key: 'updateWordKey',
						val: 'updateWord'
					});
				});
			});

			describe('child removed', () => {

				it('should register to child removed', () => {
					wordsAPI.trackChanges(_.noop);

					expect(clientDB.listenToChildRemoved).toHaveBeenCalledWith('words/second', jasmine.any(Function));
				});

				it('on change callback should be invoked with removed word info', () => {
					const changeCallback = jasmine.createSpy('changeCallback');

					wordsAPI.trackChanges(changeCallback);
					const dbListener = clientDB.listenToChildRemoved.calls.argsFor(1)[1];

					dbListener('removedWord', 'removedWordKey');

					expect(changeCallback).toHaveBeenCalledWith({
						collection: 'second',
						type: 'remove',
						key: 'removedWordKey',
						val: 'removedWord'
					});
				});
			});

		});

	});

});
