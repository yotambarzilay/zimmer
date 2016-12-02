import React from 'react';
import ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import Admin from './components/Admin';

useStrict(true);

ReactDOM.render(<Admin />, document.getElementById('app'));
