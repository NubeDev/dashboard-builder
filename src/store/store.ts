import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { elementsLayoutSlice } from './elements-layout'
import { tempListComponentsSlice } from './temp-list-components'
import { tempListMenusSlice } from './temp-list-menus'

export const rootReducer = combineReducers({
  elementsLayout: elementsLayoutSlice.reducer,
  tempListComponents: tempListComponentsSlice.reducer,
  tempListMenus: tempListMenusSlice.reducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
