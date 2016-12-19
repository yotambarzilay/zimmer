import React from 'react';
import { observer, inject } from 'mobx-react';

const Header = inject('authStore')(observer(({authStore}) => (
    <div>
        {!authStore.isLoggedIn && <button onClick={authStore.login}>התחבר</button>}
        {authStore.isLoggedIn && <button onClick={authStore.logout}>התנתק</button>}
        {authStore.isLoggedIn && !authStore.isAdmin && <h3>התה לא הדמין</h3>}
    </div>
)));

Header.displayName = 'Header';

export default Header;