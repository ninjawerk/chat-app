import { CLEAR_CHAT_LOG, ADD_MESSAGE_TO_CHAT_LOG } from '../actions/chat.actions';

const initialSate ={
  chatLog: [],
  chatEnabled: false
};

const reducer = function chatReducer (state = initialSate, action) {
  switch (action.type) {
    case ADD_MESSAGE_TO_CHAT_LOG:
      return {
        ...state,
        chatLog: [...state.chatLog, action.payload],
      };

    case CLEAR_CHAT_LOG:
      return  {
        ...state,
        chatLog: []
      };

    case CLEAR_CHAT_LOG:
      return  {
        ...state,
        chatEnabled: true
      };

    default:
      return state
  }
};

export default reducer