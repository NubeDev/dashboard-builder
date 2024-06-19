import { Provider } from 'react-redux'

import { store } from '@/store/store'

import Builder from '@/pages/Builder'

function App() {
  return (
    <Provider store={store}>
      <Builder />
    </Provider>
  )
}

export default App
