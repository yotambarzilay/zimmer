import React from 'react';
import ReactDOM from 'react-dom';

import { autorun, useStrict } from 'mobx';

import wordsStore from './stores/wordsStore';

useStrict(true);

autorun(() => console.log('first:', wordsStore.getFirst) );
autorun(() => console.log('second:', wordsStore.getSecond) );

window.store = wordsStore;

import Admin from './components/Admin';

console.log(wordsStore);

ReactDOM.render(<Admin />, document.getElementById('app'));
