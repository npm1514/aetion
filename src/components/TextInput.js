import React, { Component } from 'react'

// BUG DESCRIPTION: This component is a form input that, when clicked, is supposed to pass the entered text upward to the parent App component.

// Update the component so that clicking the Send button
// xx1. Passes the text input's value upwards, and
// xx2. Also sets App.js's `submittedText` state to the text input's value.

// NB: the component currently stores the input field's value as a `text`
// string in local state, but this is not the only possible approach.

export class TextInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: ''
    }
    //bind handler
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({
      text: event.target.value
    })
  }

  render() {
    const { text } = this.state;
    //add form to outer wrapper for proper submission of input field
    return (
      <form onSubmit={(e) => this.props.onSubmit(e, text)}>
        Type something here.
        <input
          style={{margin: 10}}
          type="text"
          value={text}
          onChange={this.handleChange}
        />
        <button type="submit">Send</button>
      </form>
    )
  }
}
