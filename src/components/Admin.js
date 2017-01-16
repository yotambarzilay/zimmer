import React from 'react';
import { observer, inject } from 'mobx-react';

import Header from './Header';
import MainView from './MainView';

import * as authAPI from '../apis/authAPI';
import * as wordsAPI from '../apis/wordsAPI';

const Admin = inject('authStore', 'wordsStore')(observer(React.createClass({

	displayName: 'Admin',

	componentWillMount: function () {
		authAPI.listenToAuthChange(this.props.authStore.setUserInfo);
		wordsAPI.getWords(this.props.wordsStore.setWords);
		wordsAPI.trackChanges(this.props.wordsStore.onChange);
	},

	render: function () {
		return (
			<div>
				<Header />
				{this.props.authStore.isAdmin && <MainView />}
			</div>
		);
	}

})));

export default Admin;