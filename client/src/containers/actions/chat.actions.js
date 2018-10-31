export const ADD_MESSAGE_TO_CHAT_LOG = "ADD_MESSAGE_TO_CHAT";
export const CLEAR_CHAT_LOG = "CLEAR_CHAT_LOG";

export function addMessageToChatLog (message) {
    return {
      type: ADD_MESSAGE_TO_CHAT_LOG,
      payload: message,
    }
  }

export function clearChatLog () {
    return {
      type: CLEAR_CHAT_LOG,
    }
  }