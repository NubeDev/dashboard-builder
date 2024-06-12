import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import { store } from './store/store'

import App from './App'

test('renders Builder component', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )
  // Assuming the Builder component has some identifiable text or element
  const builderElement = screen.getByText(/Preview/i)
  expect(builderElement).toBeInTheDocument()
})
