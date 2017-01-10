import React from 'react';
import ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import {Provider} from 'mobx-react';
import Admin from './components/Admin';

import AuthStore from './stores/AuthStore';
import wordsStore from './stores/wordsStore';

useStrict(true);

ReactDOM.render(
    <Provider authStore={new AuthStore()} wordsStore={wordsStore}>
        <Admin />
    </Provider>,
    document.getElementById('app'));
