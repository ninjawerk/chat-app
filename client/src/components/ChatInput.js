import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ChatInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    }
  }

  sendMessage = () => {
    this.props.sendMessage(this.state.message);
    this.setState({ message: "" });
  }

  handleMessageChange = (e) => {
    this.setState({ message: e.target.value });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.sendMessage}>
          <input value={this.state.message} onChange={this.handleMessageChange} />
          <input type="submit" value="send" />
        </form>
      </div >
    )
  }
}

ChatInput.propTypes = {
  sendMessage: PropTypes.func.isRequired,
}

export default ChatInput
