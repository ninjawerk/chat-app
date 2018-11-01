import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import * as signalR from '@aspnet/signalr';
import ChatLog from './ChatLog';
import ChatInput from '../components/ChatInput';
import { connect } from 'react-redux'
import ChatConfigInput from '../components/ChatConfigInput';
import { addMessageToChatLog, clearChatLog, enableChat } from './actions/chat.actions';
import { CommandType, Commands } from '../constants';

const styles = {
  chatBackground: {background: '#f7f6ee'},
  chatInputBackground: {background: '#debd86', minHeight: "70px"},
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
      chatEnabled: false
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
        if(message.type === CommandType.SUCCESS && message.command === Commands.REGISTER){
          this.setState({
            chatEnabled: true
          })
        }
        this.props.addToChatLog(message)
      });
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
    const {chatEnabled} = this.state;

    const renderConfigInput = () => ( 
      <div className="d-flex p-2" style={styles.chatInputBackground}>
          <ChatConfigInput sendConfig={this.sendConfig} configEnabled={!chatEnabled}></ChatConfigInput>
      </div>
    )

    const renderChatLog = () => ( 
      <div className="d-flex flex-sm-grow-1 p-2 px-4" style={styles.chatBackground}>
          <ChatLog></ChatLog>
      </div>
    )

    const renderChatInput = () => ( 
      <div className="d-flex align-items-end">
        <ChatInput sendMessage={this.sendMessage} chatEnabled={chatEnabled} ></ChatInput>
      </div>
    )

    const renderInstructions = () => ( 
      <div className="d-flex flex-sm-grow-1 p-2 px-4" style={styles.chatBackground}>
        <h5 className="text-uppercase align-self-center mx-auto">Enter the above details to begin chatting.</h5>
      </div>
    )

    return (
      <div className="container h-100 d-flex flex-column">
        {renderConfigInput()}
        {chatEnabled && renderChatLog()}
        {chatEnabled && renderChatInput()}
        {!chatEnabled && renderInstructions()}
      </div>
    )
  }
}

const mapStateToProps = state => ({

})

function mapDispatchToProps(dispatch) {
  return {
    addToChatLog: (message) => {
      dispatch(addMessageToChatLog(message));
    },
    enableChat: (userName, roomName, ) => {
      dispatch(enableChat(userName,roomName));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatContainer)
