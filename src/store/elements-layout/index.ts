import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

import { DragItemModel, ElementModel, RowModel } from 'src/utils/models'

import type { PayloadAction } from '@reduxjs/toolkit'

interface ElementsLayoutState {
  listElements: RowModel[]
}

const initialState: ElementsLayoutState = {
  listElements: []
}

export const elementsLayoutSlice = createSlice({
  name: 'elementsLayout',
  initialState,
  reducers: {
    addRow: (state, action: PayloadAction<RowModel>) => {
      state.listElements.push(action.payload)
    },
    removeRow: (state, action: PayloadAction<string>) => {
      state.listElements = state.listElements.filter(element => element.id !== action.payload)
    },
    addColumnToRow: (state, action: PayloadAction<{ rowId: string; listColumn: DragItemModel[] }>) => {
      const currentRow = state.listElements.find(row => row.id === action.payload.rowId)
      if (currentRow) {
        currentRow.column = action.payload.listColumn
      }
    },
    addElementToColumn: (state, action: PayloadAction<{ rowId: string; columnId: string; ele: ElementModel }>) => {
      const currentRow = state.listElements.find(row => row.id === action.payload.rowId)
      if (currentRow) {
        const currentColumn = currentRow.column.find(column => column.id === action.payload.columnId)
        if (currentColumn) {
          currentColumn.component = action.payload.ele.element
        }
      }
    },
    swapElement: (
      state,
      action: PayloadAction<{ dragRowId: string; dragColumnId: string; dropRowId: string; dropColumnId: string }>
    ) => {
      const dragRow = state.listElements.find(row => row.id === action.payload.dragRowId)
      const dropRow = state.listElements.find(row => row.id === action.payload.dropRowId)

      if (dragRow && dropRow) {
        const dragColumn = dragRow.column.find(col => col.id === action.payload.dragColumnId)
        const dropColumn = dropRow.column.find(col => col.id === action.payload.dropColumnId)

        if (dragColumn && dropColumn) {
          const temp = dragColumn.component
          dragColumn.component = dropColumn.component
          dropColumn.component = temp
        }
      }
    },
    removeElementFromColumn: (state, action: PayloadAction<{ rowId: string; columnId: string }>) => {
      const currentRow = state.listElements.find(row => row.id === action.payload.rowId)
      if (currentRow) {
        const currentColumn = currentRow.column.find(column => column.id === action.payload.columnId)

        if (currentColumn) {
          currentColumn.component = undefined
        }
      }
    },
    onFocusToItem: (
      state,
      action: PayloadAction<{ id: string; elementType: string; parentId: string | undefined }>
    ) => {
      state.listElements.forEach(row => {
        row.isFocused = false
        row.column.forEach(col => {
          col.isFocused = false
        })
      })

      if (action.payload.elementType.toLocaleLowerCase() === 'row') {
        const currentRow = state.listElements.find(r => r.id === action.payload.id)

        if (currentRow) {
          currentRow.isFocused = true
        }
      }

      if (action.payload.elementType.toLocaleLowerCase() === 'column' && action.payload.parentId) {
        const currentRow = state.listElements.find(r => r.id === action.payload.parentId)

        if (currentRow) {
          const currentColumn = currentRow.column.find(c => c.id === action.payload.id)

          if (currentColumn) {
            currentColumn.isFocused = true
          }
        }
      }
    },
    addRowByCopy: (state, action: PayloadAction<{ rowId: string; copyRowId: string }>) => {
      const currentRowIndex = state.listElements.findIndex(row => row.id === action.payload.rowId)
      const copyCurrentRow = state.listElements.find(row => row.id === action.payload.copyRowId)

      if (currentRowIndex !== -1 && copyCurrentRow) {
        const newRow: RowModel = { ...copyCurrentRow, id: uuidv4() }
        const newRowColumn = newRow.column.map(col => ({ ...col, id: uuidv4() }))

        state.listElements.splice(currentRowIndex + 1, 0, { ...newRow, column: newRowColumn })
      }
    },
    addColumnByRowIdAndColumnElement: (
      state,
      action: PayloadAction<{ rowId: string; columnElement: DragItemModel }>
    ) => {
      const currentRow = state.listElements.find(row => row.id === action.payload.rowId)

      if (currentRow && currentRow.column) {
        currentRow.column[currentRow.column.length - 1] = { ...action.payload.columnElement, id: uuidv4() }
      }
    },
    addColumnByColumnIdAndColumnElement: (
      state,
      action: PayloadAction<{ columnId: string; columnElement: DragItemModel }>
    ) => {
      const currentRowIndex = state.listElements.findIndex(row =>
        row.column?.find(col => col.id === action.payload.columnId)
      )

      if (currentRowIndex !== -1) {
        const currentColumnIndex = state.listElements[currentRowIndex].column.findIndex(
          col => col.id === action.payload.columnId
        )

        if (currentColumnIndex !== -1) {
          state.listElements[currentRowIndex].column[currentColumnIndex] = {
            ...action.payload.columnElement,
            id: uuidv4()
          }
        }
      }
    },
    removeElementFromColumnByColumnId: (state, action: PayloadAction<{ columnId: string }>) => {
      const currentRow = state.listElements.find(row => row.column?.find(col => col.id === action.payload.columnId))

      if (currentRow) {
        const currentColumn = currentRow.column?.find(col => col.id === action.payload.columnId)

        if (currentColumn) {
          currentColumn.component = undefined
        }
      }
    },
    changeComponentPropByColumnId: (state, action: PayloadAction<DragItemModel>) => {
      const currentRow = state.listElements.find(row => row.column?.find(col => col.id === action.payload.id))

      if (currentRow) {
        const currentColumnIndex = currentRow.column.findIndex(col => col.id === action.payload.id)

        if (currentColumnIndex !== -1) {
          currentRow.column[currentColumnIndex] = action.payload
        }
      }
    }
  }
})

export const {
  addRow,
  removeRow,
  addColumnToRow,
  addElementToColumn,
  swapElement,
  removeElementFromColumn,
  onFocusToItem,
  addRowByCopy,
  addColumnByRowIdAndColumnElement,
  addColumnByColumnIdAndColumnElement,
  removeElementFromColumnByColumnId,
  changeComponentPropByColumnId
} = elementsLayoutSlice.actions
export default elementsLayoutSlice.reducer
