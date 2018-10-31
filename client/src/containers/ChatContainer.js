import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import * as signalR from '@aspnet/signalr';
import ChatLog from './ChatLog';
import ChatInput from '../components/ChatInput';
import { connect } from 'react-redux'
import ChatConfigInput from '../components/ChatConfigInput';
import { addMessageToChatLog, clearChatLog } from './actions/chat.actions';

const styles = {
  chatBackground: {background: '#f7f6ee'},
  chatInputBackground: {background: '#debd86'},
}
class ChatContainer extends Component {
  
  constructor(props) {
    super(props);

    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:5001/chathub")
      .build();

    this.state = {
      connection,
      roomName: '',
      userName: '',
    };

    this.startListening();
  }

  startListening = async () => {
    try {
      await this.state.connection.start();
      this.state.connection.on("Send",  (message) => {
        this.props.addToChatLog(message)
      });
      this.state.connection.on("CommandSend",   (message) => {
        this.props.addToChatLog(message)
      });
      await this.state.connection.invoke("AddToGroup", "Beast", "Junkertown");
      await this.state.connection.invoke("SendMessageToGroup", "Junkertown", "I'm Back!");
    } catch (e) {
      console.error(e.toString());
    }
  }

  sendMessage = async (message) => {
    await this.state.connection.invoke("SendMessageToGroup", this.state.roomName, message);
  }

  sendConfig = async (config) => {
    this.setState({...config});
    await this.state.connection.invoke("AddToGroup", config.userName, config.roomName);
  }

  render() {
    // const { value, onIncrement, onDecrement } = this.props
    return (
      <div className="container h-100 d-flex flex-column">
        <div className="d-flex p-2" style={styles.chatInputBackground}>
          <ChatConfigInput sendConfig={this.sendConfig}></ChatConfigInput>
        </div>
        <div className="d-flex flex-sm-grow-1 p-2 px-4" style={styles.chatBackground}>
          <ChatLog></ChatLog>
        </div>
        <div className="d-flex align-items-end">
          <ChatInput sendMessage={this.sendMessage}></ChatInput>
        </div>
      </div>
    )
  }
}

// ChatContainer.propTypes = {
// }


const mapStateToProps = state => ({

})

function mapDispatchToProps(dispatch) {
  return {
    addToChatLog: (message) => {
      dispatch(addMessageToChatLog(message));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatContainer)
