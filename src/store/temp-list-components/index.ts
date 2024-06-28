import { createSlice } from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'

export interface TempComponentsModel {
  componentName: string
}

interface TempListComponentsState {
  listTempComponents: string
}

const initialState: TempListComponentsState = {
  listTempComponents: ''
}

export const tempListComponentsSlice = createSlice({
  name: 'tempListComponents',
  initialState,
  reducers: {
    addToTempList: (state, action: PayloadAction<string>) => {
      state.listTempComponents = action.payload
    },
    removeCopyFromTempList: state => {
      state.listTempComponents = ''
    }
  }
})

export const { removeCopyFromTempList, addToTempList } = tempListComponentsSlice.actions
export default tempListComponentsSlice.reducer
