import { CircleX } from 'lucide-react'

import { cn } from 'src/shadcn/lib/utils'
import { LIST_ELEMENTS_EXAMPLE } from 'src/constants'

import PlusElement from 'src/components/common/BlankBlock/PlusElement'
import { getComponentByName } from 'src/utils'
import { DragItemModel, ElementModel } from 'src/utils/models'

type Props = {
  item: DragItemModel
  className?: string
  onSelectedElement: (element: ElementModel, id: string) => void
  onRemoveElement: (id: string) => void
  onDragStart: (id: string) => void
  onDropEnd: (id: string) => void
}

const DragDropItem: React.FC<Props> = ({
  item,
  className,
  onDragStart,
  onDropEnd,
  onSelectedElement,
  onRemoveElement
}) => {
  // functions
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    onDragStart(item.id)
    e.stopPropagation()
  }

  const handleOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDropEnd = () => {
    onDropEnd(item.id)
  }

  const handleSelectElement = (element: ElementModel) => {
    onSelectedElement(element, item.id)
  }

  const CurrentComponent = getComponentByName(item.componentName || '')

  return (
    <div
      draggable
      className={cn(
        'w-full cursor-move h-full shadow-column-sm',
        className && className,
        item.isFocused && 'outline-1 outline outline-sky-500'
      )}
      onDragStart={handleDragStart}
      onDragOver={handleOver}
      onDrop={handleDropEnd}
    >
      {CurrentComponent ? (
        <div className="w-full relative group/close">
          <button
            className="absolute top-2 right-2 z-30 bg-white rounded-full hidden group-hover/close:inline-block transition-all"
            onClick={() => {
              onRemoveElement(item.id)
            }}
          >
            <CircleX className="text-red-600" />
          </button>
          <CurrentComponent {...item.props} />
        </div>
      ) : (
        <div className="w-full min-h-24 h-full flex items-center justify-center">
          <PlusElement listElements={LIST_ELEMENTS_EXAMPLE} handleSelectElement={handleSelectElement} />
        </div>
      )}
    </div>
  )
}

export default DragDropItem
