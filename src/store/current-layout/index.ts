import { createSlice } from '@reduxjs/toolkit'
import { LayoutState } from 'src/utils/models'

const initialState: LayoutState = {
  pastLayouts: [],
  presentLayout: [],
  futureLayouts: []
}

export const layoutSlide = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    undo: state => {
      if (state.pastLayouts.length === 0) return
      const previous = state.pastLayouts.pop()
      state.futureLayouts = [state.presentLayout, ...state.futureLayouts].slice(0, 10)
      state.presentLayout = previous || []
    },
    redo: state => {
      if (state.futureLayouts.length === 0) return
      const next = state.futureLayouts.shift()
      state.pastLayouts = [...state.pastLayouts, state.presentLayout].slice(-10)
      state.presentLayout = next || []
    }
  }
})

export const { undo, redo } = layoutSlide.actions
export default layoutSlide.reducer
