import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as signalR from '@aspnet/signalr';
import ChatLog from '../components/ChatLog';
import ChatInput from '../components/ChatInput';
import { connect } from 'react-redux'

class ChatContainer extends Component {
  constructor(props) {
    super(props);

    const connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:55403/chathub")
      .build();

    this.state = {
      connection
    };

    this.startListening();
  }

  startListening = async () => {
    try {
      await this.state.connection.start();
      this.state.connection.on("Send", function (message) {
        console.log(message);
      });

      await this.state.connection.invoke("AddToGroup", "Junkertown");
      await this.state.connection.invoke("SendMessageToGroup", "Junkertown", "I'm Back!");
    } catch (e) {
      console.error(e.toString());
    }
  }

  sendMessage = () => {

  }


  render() {
    // const { value, onIncrement, onDecrement } = this.props
    return (
      <div>
        <ChatLog log={[]}></ChatLog>
        <ChatInput sendMessage={this.sendMessage}></ChatInput>
      </div>
    )
  }
}

ChatContainer.propTypes = {
}

const mapStateToProps = state => ({
  chatData: state.chatData,

})

// const mapDispatchToProps = dispatch => ({
//   toggleTodo: id => dispatch(toggleTodo(id))
// })

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(ChatContainer)
