import chatReducer from './chat.reducer'
import { ADD_MESSAGE_TO_CHAT_LOG, CLEAR_CHAT_LOG, ENABLE_CHAT } from '../actions/chat.actions';

describe('chat reducer', () => {
  describe('reduce', () => {
 
    const initialSate ={
      chatLog: [],
      chatEnabled: false
    };

    it('should add chat to chat log', () => {
      const state = chatReducer(initialSate, { type: ADD_MESSAGE_TO_CHAT_LOG, payload: "Boo" });
      expect(state.chatLog.length).toBe(1);
    })

    it('should clear chat log', () => {
      const state = chatReducer(initialSate, { type: ADD_MESSAGE_TO_CHAT_LOG, payload: "Boo" });
      const modifiedState = chatReducer(state, {type: CLEAR_CHAT_LOG});
      expect(modifiedState.chatLog.length).toBe(0);
    })
 
    it('should enable chat', () => {
      const state = chatReducer(initialSate, { type: ENABLE_CHAT});
      expect(state.chatEnabled).toBe(true);
    })
  })
})
