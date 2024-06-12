import { useDispatch, useSelector } from 'react-redux'

import { RootState } from 'src/store/store'
import { DragItemModel, ElementModel, RowModel } from 'src/libs/models'
import { TempComponentsModel, addCopyToTempList, removeCopyFromTempList } from 'src/store/temp-list-components'
import { addElementToColumn, addRowByCopy, removeElementFromColumn, removeRow } from 'src/store/elements-layout'

import DragDropItem from '../DragAndDrop/DragDropItem'
import WrapperRightClick from './WrapperRightClick'

type Props = {
  items: DragItemModel[]
  row: RowModel
  onSelectElement: (columnId: string, element: ElementModel) => void
  onDrag: (columnId: string) => void
  onDrop: (columnId: string) => void
  onRemove: (columnId: string) => void
}

const WrapperColumnInRow: React.FC<Props> = ({ items, row, onSelectElement, onDrag, onDrop, onRemove }) => {
  // const
  const dispatch = useDispatch()
  const tempComponents = useSelector((state: RootState) => state.tempListComponents.listTempComponents)

  // functions
  const handleDrag = (id: string) => {
    onDrag(id)
  }

  const handleDrop = (id: string) => {
    onDrop(id)
  }

  const handleSelectElement = (element: ElementModel, id: string) => {
    onSelectElement(id, element)
  }

  const handleRemoveElement = (id: string) => {
    onRemove(id)
  }

  function handleCopyColumn(d: DragItemModel, action: string) {
    if (action === 'copy') {
      const tempCopyElement: TempComponentsModel = {
        id: d.id,
        columnId: d.id,
        type: 'copy',
        rowId: row.id,
        from: 'column',
        time: new Date().toISOString(),
        component: d.component
      }
      dispatch(addCopyToTempList(tempCopyElement))
    }
  }

  function handleCopyRow(d: DragItemModel) {
    const tempCopyRow: TempComponentsModel = {
      id: d.id,
      rowId: row.id,
      type: 'copy',
      time: new Date().toISOString(),
      from: 'row'
    }
    dispatch(addCopyToTempList(tempCopyRow))
  }

  function handlePaste(d: DragItemModel) {
    const copyComponent = tempComponents.find(t => t.type === 'copy' && t.from === 'column')
    const copyRow = tempComponents.find(t => t.type === 'copy' && t.from === 'row')

    if (copyComponent) {
      const tempElementCopy: ElementModel = {
        name: d.name || '',
        label: d.name || '',
        element: copyComponent.component || (() => <></>)
      }

      dispatch(addElementToColumn({ rowId: row.id, columnId: d.id, ele: tempElementCopy }))
    }

    if (copyRow) {
      dispatch(addRowByCopy({ rowId: row.id, copyRowId: copyRow.rowId }))
    }

    dispatch(removeCopyFromTempList())
  }

  function handleDeleteColumn(d: DragItemModel) {
    dispatch(removeElementFromColumn({ rowId: row.id, columnId: d.id }))
  }

  function handleDeleteRow() {
    dispatch(removeRow(row.id))
  }

  const isFullElement = items?.length > 0 && items?.every(e => e.component)
  const isExistCopyComponent = tempComponents.some(e => e.type === 'copy')

  return (
    <div className="w-full flex gap-3 justify-between relative">
      {items.map((e, index) => (
        <WrapperRightClick
          key={e.id}
          item={e}
          isDisabledCopy={!!e.component}
          isDisabledPaste={!isExistCopyComponent}
          className={e.className}
          onCopyColumn={handleCopyColumn}
          onCopyRow={handleCopyRow}
          onPaste={handlePaste}
          onDeleteColumn={handleDeleteColumn}
          onDeleteRow={handleDeleteRow}
        >
          <DragDropItem
            item={e}
            isShowBorder={items?.length - 1 !== index && !isFullElement}
            onDragStart={handleDrag}
            onDropEnd={handleDrop}
            onSelectedElement={handleSelectElement}
            onRemoveElement={handleRemoveElement}
          />
        </WrapperRightClick>
      ))}
    </div>
  )
}

export default WrapperColumnInRow
