import { useState } from 'react'

import { cn } from '@/lib/utils'
import { LIST_ROW_LAYOUTS } from '@/constants'
import { DragItemModel, ElementModel, OutputPageBuilderModel, RowModel } from '@/utils/models'

import EditRowPopup from './EditRowPopup'
import SelectLayoutButton from '../DragAndDrop/SelectLayoutButton'
import WrapperColumnInRow from './WrapperColumnInRow'
import WrapperRightClickRow from '../WrapperRightClickRow'

type Props = {
  rowItem: RowModel
  onAdColumn: (id: string, listColumn: DragItemModel[], currentLayout: string) => void
  onSelectElement: (rowId: string, columnId: string, element: ElementModel) => void
  onSelectImage: (rowId: string, columnId: string, img: OutputPageBuilderModel) => void
  onDrag: (rowId: string, columnId: string, fromElement: string) => void
  onDrop: (rowId: string, columnId: string) => void
  onRemoveElement: (rowId: string, columnId: string) => void
}

const Row: React.FC<Props> = ({
  rowItem,
  onAdColumn,
  onSelectElement,
  onDrag,
  onDrop,
  onRemoveElement,
  onSelectImage
}) => {
  // state
  const [isOpenEditRow, setOpenEditRow] = useState(false)

  // functions
  const handleChoseLayout = (layout: string) => {
    const layoutItems = LIST_ROW_LAYOUTS.find(item => item.value === layout)?.items || []
    onAdColumn(rowItem.id, layoutItems, layout)
  }

  const handleSelectElement = (columnId: string, element: ElementModel) => {
    onSelectElement(rowItem.id, columnId, element)
  }

  const handleSelectImage = (columnId: string, out: OutputPageBuilderModel) => {
    onSelectImage(rowItem.id, columnId, out)
  }

  const handleDrag = (columnId: string) => {
    onDrag(rowItem.id, columnId, 'column')
  }

  const handleDrop = (columnId: string) => {
    onDrop(rowItem.id, columnId)
  }

  const handleRemoveElement = (columnId: string) => {
    onRemoveElement(rowItem.id, columnId)
  }

  const handleOpenEditRowModal = () => {
    setOpenEditRow(true)
  }

  const handleClose = () => {
    setOpenEditRow(false)
  }

  return (
    <>
      <WrapperRightClickRow currentRow={rowItem} onEdit={handleOpenEditRowModal}>
        <div
          className={cn(
            'px-8 py-2 relative overflow-hidden group/item mb-4',
            rowItem.isFocused && 'outline-1 outline outline-sky-500',
            !rowItem.isFocused && 'border border-gray-400 border-dashed'
          )}
        >
          {rowItem.column?.length > 0 ? (
            <WrapperColumnInRow
              row={rowItem}
              items={rowItem.column}
              onDrag={handleDrag}
              onDrop={handleDrop}
              onRemove={handleRemoveElement}
              onSelectElement={handleSelectElement}
              onSelectImage={handleSelectImage}
            />
          ) : (
            <div className="flex items-center justify-center h-24">
              <SelectLayoutButton onChoseLayout={handleChoseLayout} />
            </div>
          )}
        </div>
      </WrapperRightClickRow>
      <EditRowPopup isOpen={isOpenEditRow} currentRow={rowItem} openChange={handleClose} />
    </>
  )
}

export default Row
