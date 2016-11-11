import _ from 'lodash';
import React from 'react';
import template from './Admin.rt';

import { loginWithGoogle } from '../apis/authAPI';

class Admin extends React.Component {
  constructor () {
    super();
    _.bindAll(this);
  }

  login () {
    loginWithGoogle()
      .then(function (user) {
        console.log('user:', user);
      }, function (e) { console.log(e) })
      .catch(e => {
        console.error(e);
      });
  }

  render () {
    return template.apply(this);
  }
}

export default Admin;
