import { toast } from 'sonner'
import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

import { saveCurrentListLayout } from 'src/utils'
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
      const oldList = [...state.listElements]
      saveCurrentListLayout(oldList)
      state.listElements.push(action.payload)
    },
    removeRow: (state, action: PayloadAction<string>) => {
      saveCurrentListLayout(state.listElements)
      state.listElements = state.listElements.filter(element => element.id !== action.payload)
    },
    addColumnToRow: (
      state,
      action: PayloadAction<{ rowId: string; listColumn: DragItemModel[]; currentLayout: string }>
    ) => {
      saveCurrentListLayout(state.listElements)
      const { rowId, listColumn, currentLayout } = action.payload

      state.listElements = state.listElements.map(row =>
        row.id === rowId
          ? {
              ...row,
              currentLayout,
              column: listColumn.map(col => ({ ...col, id: uuidv4() }))
            }
          : row
      )
    },
    addElementToColumn: (state, action: PayloadAction<{ rowId: string; columnId: string; ele: ElementModel }>) => {
      saveCurrentListLayout(state.listElements)

      const { rowId, columnId, ele } = action.payload
      state.listElements = state.listElements.map(row =>
        row.id === rowId
          ? {
              ...row,
              column: row.column.map(col => (col.id === columnId ? { ...col, componentName: ele.value } : col))
            }
          : row
      )
    },
    swapElement: (
      state,
      action: PayloadAction<{ dragRowId: string; dragColumnId: string; dropRowId: string; dropColumnId: string }>
    ) => {
      saveCurrentListLayout(state.listElements)

      const dragRow = state.listElements.find(row => row.id === action.payload.dragRowId)
      const dropRow = state.listElements.find(row => row.id === action.payload.dropRowId)

      if (dragRow && dropRow) {
        const dragColumn = dragRow.column.find(col => col.id === action.payload.dragColumnId)
        const dropColumn = dropRow.column.find(col => col.id === action.payload.dropColumnId)

        if (dragColumn && dropColumn) {
          const temp = dragColumn.componentName
          dragColumn.componentName = dropColumn.componentName
          dropColumn.componentName = temp
        }
      }
    },
    removeElementFromColumn: (state, action: PayloadAction<{ rowId: string; columnId: string }>) => {
      saveCurrentListLayout(state.listElements)

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
      saveCurrentListLayout(state.listElements)

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
      saveCurrentListLayout(state.listElements)

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
      saveCurrentListLayout(state.listElements)

      const currentRow = state.listElements.find(row => row.id === action.payload.rowId)

      if (currentRow && currentRow.column) {
        currentRow.column[currentRow.column.length - 1] = { ...action.payload.columnElement, id: uuidv4() }
      }
    },
    addColumnByColumnIdAndColumnElement: (
      state,
      action: PayloadAction<{ columnId: string; columnElement: DragItemModel }>
    ) => {
      saveCurrentListLayout(state.listElements)

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
      saveCurrentListLayout(state.listElements)

      const currentRow = state.listElements.find(row => row.column?.find(col => col.id === action.payload.columnId))

      if (currentRow) {
        const currentColumn = currentRow.column?.find(col => col.id === action.payload.columnId)

        if (currentColumn) {
          currentColumn.component = undefined
        }
      }
    },
    changeComponentPropByColumnId: (state, action: PayloadAction<DragItemModel>) => {
      saveCurrentListLayout(state.listElements)

      const currentRow = state.listElements.find(row => row.column?.find(col => col.id === action.payload.id))

      if (currentRow) {
        const currentColumnIndex = currentRow.column.findIndex(col => col.id === action.payload.id)

        if (currentColumnIndex !== -1) {
          currentRow.column[currentColumnIndex] = action.payload
        }
      }
    },
    addColumnByDuplicate: (state, action: PayloadAction<DragItemModel>) => {
      saveCurrentListLayout(state.listElements)

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
      saveCurrentListLayout(state.listElements)

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
      saveCurrentListLayout(state.listElements)

      const { fromRowId, toRowId } = action.payload

      const fromRowIndex = state.listElements.findIndex(row => row.id === fromRowId)
      const toRowIndex = state.listElements.findIndex(row => row.id === toRowId)

      if (fromRowIndex !== -1 && toRowIndex !== -1) {
        const temp = state.listElements[fromRowIndex]
        state.listElements[fromRowIndex] = state.listElements[toRowIndex]
        state.listElements[toRowIndex] = temp
      }
    },
    handleUndoLayout: (state, action: PayloadAction<RowModel[]>) => {
      state.listElements = action.payload
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
  swapRowByRowId,
  handleUndoLayout
} = elementsLayoutSlice.actions
export default elementsLayoutSlice.reducer
