import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { DragItemModel } from 'src/utils/models'

interface CurrentEditComponentState {
  currentEditComponent: DragItemModel | null
}

const initialState: CurrentEditComponentState = {
  currentEditComponent: null
}

export const currentEditComponentSlice = createSlice({
  name: 'currentEditComponent',
  initialState,
  reducers: {
    setCurrentEditComponent: (state, action: PayloadAction<DragItemModel>) => {
      state.currentEditComponent = action.payload
    },
    resetCurrentEditComponent: state => {
      state.currentEditComponent = null
    }
  }
})

export const { setCurrentEditComponent, resetCurrentEditComponent } = currentEditComponentSlice.actions
export default currentEditComponentSlice.reducer
