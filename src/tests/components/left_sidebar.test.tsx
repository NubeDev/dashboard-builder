import '@testing-library/jest-dom/extend-expect'

import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'

import configureStore from 'redux-mock-store'

import LeftSidebar from 'src/components/builder/leftSidebar/LeftSidebar'

// Configure a mock store
const mockStore = configureStore([])

describe('LeftSidebar', () => {
  let store: any

  beforeEach(() => {
    store = mockStore({})
  })

  test('renders text "Nube iO"', () => {
    render(
      <Provider store={store}>
        <LeftSidebar />
      </Provider>
    )
    expect(screen.getByText('Nube iO')).toBeInTheDocument()
  })
})
