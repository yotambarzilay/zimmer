import React from 'react';
import { observer, inject } from 'mobx-react';

import Header from 'components/Header';
import MainView from 'components/MainView';

const Admin = inject('authStore')(observer(({authStore}) => (
    <div>
        <Header />
        {authStore.isAdmin && <MainView />}
    </div>
)));
Admin.displayName = 'Admin';

export default Admin;