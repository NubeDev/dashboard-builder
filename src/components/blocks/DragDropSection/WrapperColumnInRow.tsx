import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shadcn/components/dialog'
import { setCurrentEditComponent } from '@/store/current-edit-component'
import { addElementToColumn, removeElementFromColumn } from '@/store/elements-layout'
import { RootState } from '@/store/store'
import { DragItemModel, ElementModel, OutputPageBuilderModel, RowModel } from '@/utils/models'

import DragDropItem from '../DragAndDrop/DragDropItem'
import EditGrapicsBuilder from '../PageBuilder/EditGrapicsBuilder'
import WrapperRightClick from './WrapperRightClick'
import { addToTempList, removeCopyFromTempList } from '@/store/temp-list-components'

type Props = {
  items: DragItemModel[]
  row: RowModel
  onSelectElement: (columnId: string, element: ElementModel) => void
  onSelectImage: (columdId: string, out: OutputPageBuilderModel) => void
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

  // state
  const [editGrapicsBuilder, setEditGrapicsBuilder] = useState<DragItemModel | null>(null)

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
      dispatch(addToTempList(d.componentName || ''))
    }
  }

  function handlePaste(d: DragItemModel) {
    const copyComponent = tempComponents
    if (copyComponent) {
      const tempElementCopy: ElementModel = {
        name: d.name || '',
        label: d.name || '',
        value: copyComponent,
        pageBuilderId: d.pageBuilderId
      }
      dispatch(addElementToColumn({ rowId: row.id, columnId: d.id, ele: tempElementCopy }))
    }
    dispatch(removeCopyFromTempList())
  }

  function handleDeleteColumn(d: DragItemModel) {
    dispatch(removeElementFromColumn({ rowId: row.id, columnId: d.id }))
  }

  function handleEdit(d: DragItemModel) {
    if (d.type === 'image') {
      setEditGrapicsBuilder(d)
      return
    }
    dispatch(setCurrentEditComponent(d))
  }

  const handleSelectImage = (out: OutputPageBuilderModel, id: string) => {
    onSelectImage(id, out)
  }

  const isExistCopyComponent = tempComponents

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

      <Dialog open={!!editGrapicsBuilder} onOpenChange={() => setEditGrapicsBuilder(null)}>
        <DialogContent className="max-w-[calc(100vw-100px)] w-full h-[80vh] mx-auto z-[99999999]">
          <DialogHeader>
            <DialogTitle>Page Builder</DialogTitle>
          </DialogHeader>
          <EditGrapicsBuilder
            grapicsBuilder={editGrapicsBuilder}
            onSaveEditImage={handleSelectImage}
            onClose={() => setEditGrapicsBuilder(null)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default WrapperColumnInRow
