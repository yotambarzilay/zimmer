import React from 'react';
import { observer } from 'mobx-react';

import authStore from 'stores/authStore';

import Header from 'components/Header';
import MainView from 'components/MainView';

const Admin = observer(() => (
    <div>
        <Header />
        {authStore.isAdmin && <MainView />}
    </div>
))
Admin.displayName = 'Admin';

export default Admin;