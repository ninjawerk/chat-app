import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import ChatContainer from './containers/ChatContainer'

import counter from './reducers'

const store = createStore(counter)

render(
  <Provider store={store}>
    <ChatContainer />
  </Provider>,
  document.getElementById('root')
)


