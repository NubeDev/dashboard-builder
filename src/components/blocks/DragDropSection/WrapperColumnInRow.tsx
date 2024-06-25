import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/store/store'
import { setCurrentEditComponent } from '@/store/current-edit-component'
import { DragItemModel, ElementModel, RowModel } from '@/utils/models'
import { addElementToColumn, removeElementFromColumn } from '@/store/elements-layout'
import { TempComponentsModel, addCopyToTempList, removeCopyFromTempList } from '@/store/temp-list-components'

import DragDropItem from '../DragAndDrop/DragDropItem'
import WrapperRightClick from './WrapperRightClick'

type Props = {
  items: DragItemModel[]
  row: RowModel
  onSelectElement: (columnId: string, element: ElementModel) => void
  onSelectImage: (columdId: string, img: string) => void
  onDrag: (columnId: string) => void
  onDrop: (columnId: string) => void
  onRemove: (columnId: string) => void
}

const WrapperColumnInRow: React.FC<Props> = ({
  items,
  row,
  onSelectElement,
  onDrag,
  onDrop,
  onRemove,
  onSelectImage
}) => {
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
        component: d.component,
        componentName: d.name
      }
      dispatch(addCopyToTempList(tempCopyElement))
    }
  }

  function handlePaste(d: DragItemModel) {
    const copyComponent = tempComponents.find(t => t.type === 'copy' && t.from === 'column')

    if (copyComponent) {
      const tempElementCopy: ElementModel = {
        name: d.name || '',
        label: d.name || '',
        value: d.name || ''
      }

      dispatch(addElementToColumn({ rowId: row.id, columnId: d.id, ele: tempElementCopy }))
    }

    dispatch(removeCopyFromTempList())
  }

  function handleDeleteColumn(d: DragItemModel) {
    dispatch(removeElementFromColumn({ rowId: row.id, columnId: d.id }))
  }

  function handleEdit(d: DragItemModel) {
    dispatch(setCurrentEditComponent(d))
  }

  const handleSelectImage = (img: string, id: string) => {
    onSelectImage(id, img)
  }

  const isExistCopyComponent = tempComponents.some(e => e.type === 'copy')

  return (
    <div className="w-full flex gap-9 justify-between relative">
      {items.map(e => (
        <WrapperRightClick
          key={e.id}
          item={e}
          isDisabledCopy={!!e.componentName}
          isDisabledPaste={!isExistCopyComponent}
          className={e.className}
          onCopyColumn={handleCopyColumn}
          onEdit={handleEdit}
          onPaste={handlePaste}
          onDeleteColumn={handleDeleteColumn}
        >
          <DragDropItem
            item={e}
            onDragStart={handleDrag}
            onDropEnd={handleDrop}
            onSelectedElement={handleSelectElement}
            onRemoveElement={handleRemoveElement}
            onSelectImage={handleSelectImage}
          />
        </WrapperRightClick>
      ))}
    </div>
  )
}

export default WrapperColumnInRow
