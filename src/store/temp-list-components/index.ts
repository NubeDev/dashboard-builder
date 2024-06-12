import { createSlice } from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'

export interface TempComponentsModel {
  id: string
  type: 'undo' | 'redo' | 'copy'
  rowId: string
  columnId?: string
  elementId?: string
  time: string
  from: string
  component?: () => JSX.Element
}

interface TempListComponentsState {
  listTempComponents: TempComponentsModel[]
}

const initialState: TempListComponentsState = {
  listTempComponents: []
}

export const tempListComponentsSlice = createSlice({
  name: 'tempListComponents',
  initialState,
  reducers: {
    addToTempList: (state, action: PayloadAction<TempComponentsModel>) => {
      state.listTempComponents.push(action.payload)
    },
    addCopyToTempList: (state, action: PayloadAction<TempComponentsModel>) => {
      const tempList = state.listTempComponents.filter(l => l.type !== 'copy')
      const newTempList = [...tempList, action.payload]
      state.listTempComponents = newTempList
    },
    removeCopyFromTempList: state => {
      state.listTempComponents = state.listTempComponents.filter(l => l.type !== 'copy')
    }
  }
})

export const { addCopyToTempList, removeCopyFromTempList } = tempListComponentsSlice.actions
export default tempListComponentsSlice.reducer
