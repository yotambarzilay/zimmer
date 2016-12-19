import React from 'react';
import ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import {Provider} from 'mobx-react';
import Admin from './components/Admin';

import authStore from './stores/authStore';
import wordsStore from './stores/wordsStore';

useStrict(true);

ReactDOM.render(
    <Provider authStore={authStore} wordsStore={wordsStore}>
        <Admin />
    </Provider>,
    document.getElementById('app'));
