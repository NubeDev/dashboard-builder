import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { elementsLayoutSlice } from './elements_layout'
import { tempListComponentsSlice } from './temp_list_components'
import { tempListMenusSlice } from './temp_list_menus'

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
