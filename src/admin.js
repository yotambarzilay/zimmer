import React from 'react';
import ReactDOM from 'react-dom';
import wordsStore from './stores/wordsStore';
import { useStrict } from 'mobx';

console.log(wordsStore);
useStrict(true);

import Admin from './components/Admin';

ReactDOM.render(<Admin />, document.getElementById('app'));
