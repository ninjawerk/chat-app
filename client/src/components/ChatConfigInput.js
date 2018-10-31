import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ChatConfigInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      roomName: ""
    }
  }

  sendConfig = (e) => {
    e.preventDefault();
    const config = {userName: this.state.userName, roomName: this.state.roomName}
    this.props.sendConfig(config);
  }

  handleUsernameChange = (e) => {
    this.setState({ userName: e.target.value });
  }

  handleRoomNameChange = (e) => {
    this.setState({ roomName: e.target.value });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.sendConfig}>
          <input value={this.state.message} onChange={this.handleUsernameChange} placeholder="Username"/>
          <input value={this.state.message} onChange={this.handleRoomNameChange} placeholder="Meeting Name"/>
          <input type="submit" value="send" />
        </form>
      </div >
    )
  }
}

ChatConfigInput.propTypes = {
  sendConfig: PropTypes.func.isRequired,
}

export default ChatConfigInput
