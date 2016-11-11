import React from 'react';
import ReactDOM from 'react-dom';

import { useStrict } from 'mobx';

useStrict(true);

import Admin from './components/Admin';

ReactDOM.render(<Admin />, document.getElementById('app'));
