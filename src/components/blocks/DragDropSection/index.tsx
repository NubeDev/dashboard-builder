import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { DragItemModel, ElementModel, OutputPageBuilderModel, RowModel } from '@/utils/models'
import {
  addColumnToRow,
  addElementToColumn,
  swapElement,
  removeElementFromColumn,
  swapRowByRowId
} from '@/store/elements-layout'

import Row from './Row'
import WrapperDragDropRow from '../WrapperDragDropRow'

type Props = {
  listRows: RowModel[]
}

const DragDropSection: React.FC<Props> = ({ listRows }) => {
  // const
  const dispatch = useDispatch()

  // state
  const [dragId, setDragId] = useState<{ rowId: string; columnId: string } | null>(null)
  const [dragRowId, setDragRowId] = useState<string | null>(null)

  // functions
  const handleAddColumn = (rowId: string, listColumn: DragItemModel[], currentLayout: string) => {
    dispatch(addColumnToRow({ rowId, listColumn, currentLayout }))
  }

  const handleSelectElement = (rowId: string, columnId: string, element: ElementModel) => {
    dispatch(addElementToColumn({ rowId, columnId, ele: element }))
  }

  const handleSelectImage = (rowId: string, columnId: string, img: OutputPageBuilderModel) => {
    const componentImage: ElementModel = {
      name: 'image',
      label: 'image',
      value: img.url,
      type: 'image',
      pageBuilderId: img.id
    }
    dispatch(addElementToColumn({ rowId, columnId, ele: componentImage }))
  }

  const handleDrag = (rowId: string, columnId: string, fromElement: string) => {
    if (fromElement === 'column') {
      setDragId({ rowId, columnId })
    } else if (fromElement === 'row') {
      setDragRowId(rowId)
    }
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

  const handleDropRow = (rowId: string) => {
    if (!dragRowId) return

    dispatch(swapRowByRowId({ fromRowId: dragRowId, toRowId: rowId }))
    setDragRowId(null)
  }

  return (
    <>
      {listRows.map(row => (
        <WrapperDragDropRow key={row.id} currentRow={row} onDragRow={handleDrag} onDropRow={handleDropRow}>
          <Row
            rowItem={row}
            onAdColumn={handleAddColumn}
            onSelectElement={handleSelectElement}
            onDrag={handleDrag}
            onDrop={handleDrop}
            onRemoveElement={handleRemoveElement}
            onSelectImage={handleSelectImage}
          />
        </WrapperDragDropRow>
      ))}
    </>
  )
}

export default DragDropSection
