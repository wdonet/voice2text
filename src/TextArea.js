import React from 'react';

export default class TextArea extends React.Component {

  // constructor (props, context) {
  //   super(props, context);
  // }

  render() {
    return (
      <textarea rows="15" cols="100"
        onChange={this.props.handler}
        value={this.props.value}/>
    );
  }
}