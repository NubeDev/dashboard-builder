import { createSlice } from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'
import { DragItemModel, RowModel } from 'src/utils/models'

export interface TempMenuModel {
  id: string
  type: 'copy' | 'undo' | 'redo'
  tempId: string
  position?: string
  time?: string
  tempComponent?: RowModel | DragItemModel | (() => JSX.Element)
}

interface TempListMenusState {
  listTempMenus: TempMenuModel[]
}

const initialState: TempListMenusState = {
  listTempMenus: []
}

export const tempListMenusSlice = createSlice({
  name: 'tempListMenus',
  initialState,
  reducers: {
    addTempMenu: (state, action: PayloadAction<TempMenuModel>) => {
      const newTempMenu = state.listTempMenus.filter(l => l.type !== 'copy')
      state.listTempMenus = [...newTempMenu, action.payload]
    }
  }
})

export const { addTempMenu } = tempListMenusSlice.actions
export default tempListMenusSlice.reducer
