import { observer, inject } from 'mobx-react';
import * as authAPI from '../apis/authAPI';

const Header = inject('authStore')(observer(({ authStore }) => (
	<div>
		{!authStore.isLoggedIn && <button onClick={authAPI.loginWithGoogle}>התחבר</button>}
		{authStore.isLoggedIn && <button onClick={authAPI.logout}>התנתק</button>}
		{authStore.isLoggedIn && !authStore.isAdmin && <h3>התה לא הדמין</h3>}
	</div>
)));

Header.displayName = 'Header';

export default Header;