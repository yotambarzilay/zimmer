import React from 'react';
import template from './RemovableTextInput.rt';

class RemovableTextInput extends React.Component {
  render = template

  onDelete = () => {
    this.props.onDelete(this.props.id);
  }

  onSubmit = () => {
    this.props.onSubmit(this.refs.input.value, this.props.id);
  }
}

export default RemovableTextInput;
