import { cn } from 'src/shadcn/lib/utils'
import { LIST_ROW_LAYOUTS } from 'src/constants'
import { DragItemModel, ElementModel, RowModel } from 'src/utils/models'

import SelectLayoutButton from '../DragAndDrop/SelectLayoutButton'
import WrapperColumnInRow from './WrapperColumnInRow'

type Props = {
  rowItem: RowModel
  onAdColumn: (id: string, listColumn: DragItemModel[]) => void
  onSelectElement: (rowId: string, columnId: string, element: ElementModel) => void
  onDrag: (rowId: string, columnId: string) => void
  onDrop: (rowId: string, columnId: string) => void
  onRemoveElement: (rowId: string, columnId: string) => void
}

const Row: React.FC<Props> = ({ rowItem, onAdColumn, onSelectElement, onDrag, onDrop, onRemoveElement }) => {
  // state

  // functions
  const handleChoseLayout = (layout: string) => {
    const layoutItems = LIST_ROW_LAYOUTS.find(item => item.value === layout)?.items || []
    onAdColumn(rowItem.id, layoutItems)
  }

  const handleSelectElement = (columnId: string, element: ElementModel) => {
    onSelectElement(rowItem.id, columnId, element)
  }

  const handleDrag = (columnId: string) => {
    onDrag(rowItem.id, columnId)
  }

  const handleDrop = (columnId: string) => {
    onDrop(rowItem.id, columnId)
  }

  const handleRemoveElement = (columnId: string) => {
    onRemoveElement(rowItem.id, columnId)
  }

  return (
    <div
      className={cn(
        'px-4 py-2 relative overflow-hidden group/item',
        rowItem.isFocused && 'outline-1 outline outline-sky-500',
        !rowItem.isFocused && 'border border-gray-400 border-dashed'
      )}
    >
      {rowItem.column?.length > 0 ? (
        <WrapperColumnInRow
          items={rowItem.column}
          row={rowItem}
          onSelectElement={handleSelectElement}
          onDrag={handleDrag}
          onDrop={handleDrop}
          onRemove={handleRemoveElement}
        />
      ) : (
        <div className="flex items-center justify-center h-24">
          <SelectLayoutButton onChoseLayout={handleChoseLayout} />
        </div>
      )}
    </div>
  )
}

export default Row
