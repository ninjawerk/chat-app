import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';

import ChatContainer from './containers/ChatContainer'

import reducer from './containers/reducers/chat.reducer';

const store = createStore(reducer)

render(
  <Provider store={store}>
    <ChatContainer />
  </Provider>,
  document.getElementById('root')
)


