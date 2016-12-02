import React from 'react';

class RemovableTextInput extends React.Component {

  render = () => {
    return (
        <div>
            {this.props.onDelete && <button key="btnDelete" onClick={this.onDelete}>x</button>}
            <input type="text"
                ref="input"
                defaultValue={this.props.label || ''}
                onKeyPress={this.onKeyPress}
                onChange={this.onChange}
                    />
            <button onClick={this.onSubmit}>{this.props.submitLabel}</button>
        </div>
    );
  }

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.onSubmit();
    }
  }

  onChange = (e) => {
    this.props.onChange && this.props.onChange(e.target.value);
  }

  onDelete = () => {
    this.props.onDelete(this.props.id);
  }

  onSubmit = () => {
    this.props.onSubmit(this.refs.input.value, this.props.id);
    if (this.props.clearOnSubmit) {
      // todo - use state
      this.refs.input.value = '';
      this.props.onChange('');
    }
  }
}

export default RemovableTextInput;
