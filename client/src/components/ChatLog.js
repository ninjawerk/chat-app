import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ChatLog extends Component {
  createChatLog = (log) => {
    return log.map(chat => {
      return (
        <li>
          <div class="message">{log.message}</div>
          <div class="author">{log.author}</div>
        </li>
      )
    });
  }

  render() {
    const { log } = this.props
    return (
      <div>
        <ul>
          {this.createChatLog(log)}
        </ul>
      </div>
    )
  }
}

ChatLog.propTypes = {
  log: PropTypes.array.isRequired,
}

export default ChatLog
