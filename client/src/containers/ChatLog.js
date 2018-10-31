import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class ChatLog extends Component {
  createChatLog = (log) => {
    return log.map(chat => {
      return (
          <div className=""  key={chat.id} >
            <div className="row">
              <small className="font-weight-bold">
                {chat.author}
              </small>
            </div>
            <div className="row mb-3">{chat.message}</div>
            <hr/>
          </div>
      )
    });
  }

  render() {
    const { chatData } = this.props
    return (
      <div className="col-md-12 mt-3 mb-3">
          {this.createChatLog(chatData)}
      </div>
    )
  }
}

ChatLog.propTypes = {
  // log: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  chatData: state.chatLog,
})

export default connect(
  mapStateToProps
)(ChatLog)

