import { Provider } from 'react-redux'

import React from 'react'
import Builder from './pages/Builder'

import { store } from 'src/store/store'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Builder />
    </Provider>
  )
}

export default App
