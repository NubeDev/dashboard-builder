import { toast } from 'sonner'
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
    addColumnToRow: (
      state,
      action: PayloadAction<{ rowId: string; listColumn: DragItemModel[]; currentLayout: string }>
    ) => {
      const currentRow = state.listElements.find(row => row.id === action.payload.rowId)
      if (currentRow) {
        currentRow.currentLayout = action.payload.currentLayout
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
    },
    addColumnByDuplicate: (state, action: PayloadAction<DragItemModel>) => {
      const currentRow = state.listElements.find(row => row.column?.find(col => col.id === action.payload.id))

      if (currentRow) {
        if (currentRow.column.length === 4) {
          toast.info('Maximum is 4 column.')
          return
        }

        const currentColumnIndex = currentRow.column.findIndex(col => col.id === action.payload.id)

        currentRow.column.splice(currentColumnIndex + 1, 0, { ...action.payload, id: uuidv4() })
      }
    },
    changeRowLayout: (state, action: PayloadAction<{ rowId: string; newListColumns: DragItemModel[] }>) => {
      const { rowId, newListColumns } = action.payload
      const currentRowIndex = state.listElements.findIndex(row => row.id === rowId)

      if (currentRowIndex !== -1) {
        const updateRow = { ...state.listElements[currentRowIndex] }
        const updateColumns = newListColumns.map((newCol, index) => {
          const oldCol = updateRow.column[index]

          if (oldCol && oldCol.component) {
            return { ...newCol, component: oldCol.component }
          } else {
            return { ...newCol }
          }
        })

        updateRow.column = updateColumns

        const updatedListElements = [...state.listElements]
        updatedListElements[currentRowIndex] = updateRow

        state.listElements = updatedListElements
      }
    },
    swapRowByRowId: (state, action: PayloadAction<{ fromRowId: string; toRowId: string }>) => {
      const { fromRowId, toRowId } = action.payload

      const fromRowIndex = state.listElements.findIndex(row => row.id === fromRowId)
      const toRowIndex = state.listElements.findIndex(row => row.id === toRowId)

      if (fromRowIndex !== -1 && toRowIndex !== -1) {
        const temp = state.listElements[fromRowIndex]
        state.listElements[fromRowIndex] = state.listElements[toRowIndex]
        state.listElements[toRowIndex] = temp
      }
    }
  }
})

export const {
  addRow,
  removeRow,
  swapElement,
  addRowByCopy,
  onFocusToItem,
  addColumnToRow,
  addElementToColumn,
  addColumnByDuplicate,
  removeElementFromColumn,
  changeComponentPropByColumnId,
  addColumnByRowIdAndColumnElement,
  removeElementFromColumnByColumnId,
  addColumnByColumnIdAndColumnElement,
  changeRowLayout,
  swapRowByRowId
} = elementsLayoutSlice.actions
export default elementsLayoutSlice.reducer
