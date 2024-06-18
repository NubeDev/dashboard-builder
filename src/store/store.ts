import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { elementsLayoutSlice } from './elements-layout'
import { tempListComponentsSlice } from './temp-list-components'
import { tempListMenusSlice } from './temp-list-menus'
import { currentEditComponentSlice } from './current-edit-component'
import { layoutSlide } from './current-layout'
import { localStorageLayoutMiddleware } from './middleware'

export const rootReducer = combineReducers({
  elementsLayout: elementsLayoutSlice.reducer,
  tempListComponents: tempListComponentsSlice.reducer,
  tempListMenus: tempListMenusSlice.reducer,
  currentEditComponent: currentEditComponentSlice.reducer,
  layoutSlide: layoutSlide.reducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(localStorageLayoutMiddleware)
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
