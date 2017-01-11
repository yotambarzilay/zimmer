import React from 'react';
import ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import {Provider} from 'mobx-react';
import Admin from './components/Admin';

import AuthStore from './stores/AuthStore';
import WordsStore from './stores/WordsStore';

useStrict(true);

ReactDOM.render(
    <Provider authStore={new AuthStore()} wordsStore={new WordsStore()}>
        <Admin />
    </Provider>,
    document.getElementById('app'));
