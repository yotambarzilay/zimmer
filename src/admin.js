import React from 'react';
import ReactDOM from 'react-dom';

import wordsStore from './stores/WordsStore';

import Admin from './components/Admin';

console.log(wordsStore);

ReactDOM.render(<Admin />, document.getElementById('app'));
