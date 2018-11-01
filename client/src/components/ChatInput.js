import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ChatInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    }
  }

  sendMessage = (e) => {
    e.preventDefault();
    if(this.state.message === "") return ;
    
    this.props.sendMessage(this.state.message);
    this.setState({ message: "" });
  }

  handleMessageChange = (e) => {
    this.setState({ message: e.target.value });
  }

  render() {
    const disabled = !this.props.chatEnabled;
    return (
      <div className="col-12 p-4" style={{background: "#e4e4e4"}}>
        <form onSubmit={this.sendMessage}>
          <div className="row">
            <textarea value={this.state.message} onChange={this.handleMessageChange} className="col-10 rounded" disabled={disabled}/>
            <span className="col-2 mx-auto">
              <input type="submit" value="send" className="btn btn-primary btn-block" disabled={disabled}/>
            </span>
          </div>
        </form>
      </div >
    )
  }
}

ChatInput.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  chatEnabled: PropTypes.bool.isRequired,
}

export default ChatInput
