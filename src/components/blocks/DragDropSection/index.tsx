import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { DragItemModel, ElementModel, RowModel } from 'src/utils/models'
import { addColumnToRow, addElementToColumn, swapElement, removeElementFromColumn } from 'src/store/elements-layout'

import Row from './Row'

type Props = {
  listRows: RowModel[]
}

const DragDropSection: React.FC<Props> = ({ listRows }) => {
  // const
  const dispatch = useDispatch()

  // state
  const [dragId, setDragId] = useState<{ rowId: string; columnId: string } | null>(null)

  // functions
  const handleAddColumn = (rowId: string, listColumn: DragItemModel[], currentLayout: string) => {
    dispatch(addColumnToRow({ rowId, listColumn, currentLayout }))
  }

  const handleSelectElement = (rowId: string, columnId: string, element: ElementModel) => {
    dispatch(addElementToColumn({ rowId, columnId, ele: element }))
  }

  const handleDrag = (rowId: string, columnId: string) => {
    setDragId({ rowId, columnId })
  }

  const handleDrop = (rowId: string, columnId: string) => {
    if (!dragId) return

    dispatch(
      swapElement({ dragRowId: dragId.rowId, dragColumnId: dragId.columnId, dropRowId: rowId, dropColumnId: columnId })
    )
    setDragId(null)
  }

  const handleRemoveElement = (rowId: string, columnId: string) => {
    dispatch(removeElementFromColumn({ rowId, columnId }))
  }

  return (
    <>
      {listRows.map(row => (
        <Row
          key={row.id}
          rowItem={row}
          onAdColumn={handleAddColumn}
          onSelectElement={handleSelectElement}
          onDrag={handleDrag}
          onDrop={handleDrop}
          onRemoveElement={handleRemoveElement}
        />
      ))}
    </>
  )
}

export default DragDropSection
