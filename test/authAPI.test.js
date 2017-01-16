import _ from 'lodash';
import * as authAPI from '../src/apis/authAPI';
import * as clientDB from '../src/apis/clientDB';

describe('authAPI', () => {

	describe('listenToAuthChange', () => {

		it('should listen to db auth change', () => {
			authAPI.listenToAuthChange();

			expect(clientDB.listenToAuthChange).toHaveBeenCalled();
		});

		it('should invoke callback with null when user is logged out', () => {
			const onAuthChangeCallback = jasmine.createSpy('onAuthChangeCallback');
			let userChangeCb;

			clientDB.listenToAuthChange.and.callFake((cb) => {
				userChangeCb = cb;
			});

			authAPI.listenToAuthChange(onAuthChangeCallback);

			userChangeCb(null);

			expect(onAuthChangeCallback).toHaveBeenCalledWith(null);
		});

		describe('when user is admin', () => {

			it('should invoke callback with uid and isAdmin:true', (done) => {
				const uid = 'spiderPigUid';
				const isAdmin = true;
				const onAuthChangeCallback = jasmine.createSpy('onAuthChangeCallback');

				clientDB.listenToAuthChange.and.callFake((cb) => {
					_.defer(() => cb({ uid }));
				});

				clientDB.read.and.callFake((path, cb) => {
					_.defer(() => {
						cb(isAdmin);

						expect(onAuthChangeCallback).toHaveBeenCalledWith({ uid, isAdmin });
						expect(clientDB.read).toHaveBeenCalledWith(`admins/${uid}`, jasmine.any(Function));

						done();
					});
				});

				authAPI.listenToAuthChange(onAuthChangeCallback);
			});

		});

		describe('when user is not admin', () => {

			it('should invoke callback with uid and isAdmin:false', (done) => {
				const uid = 'spiderPigUid';
				const isAdmin = false;
				const onAuthChangeCallback = jasmine.createSpy('onAuthChangeCallback');

				clientDB.listenToAuthChange.and.callFake((cb) => {
					_.defer(() => cb({ uid }));
				});

				clientDB.read.and.callFake((path, cb) => {
					_.defer(() => {
						cb(isAdmin);

						expect(onAuthChangeCallback).toHaveBeenCalledWith({ uid, isAdmin });
						expect(clientDB.read).toHaveBeenCalledWith(`admins/${uid}`, jasmine.any(Function));

						done();
					});
				});

				authAPI.listenToAuthChange(onAuthChangeCallback);
			});

		});

	});

	describe('logout', () => {

		it('should logout', () => {
			authAPI.logout();

			expect(clientDB.logout).toHaveBeenCalled();
		});

	});

	describe('loginWithGoogle', () => {

		it('should login with google', () => {
			authAPI.loginWithGoogle();

			expect(clientDB.loginWithGoogle).toHaveBeenCalled();
		});

	});
});
