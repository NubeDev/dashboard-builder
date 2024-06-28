import { useMemo } from 'react'
import { CircleX } from 'lucide-react'

import { cn } from '@/lib/utils'
import { getComponentByName } from '@/utils'
import { LIST_ELEMENTS_EXAMPLE } from '@/constants'
import { DragItemModel, ElementModel, OutputPageBuilderModel } from '@/utils/models'

import PlusElement from '@/components/common/BlankBlock/PlusElement'

type Props = {
  item: DragItemModel
  className?: string
  onSelectedElement: (element: ElementModel, id: string) => void
  onSelectImage: (out: OutputPageBuilderModel, id: string) => void
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
  onRemoveElement,
  onSelectImage
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

  const handleSelectImage = (out: OutputPageBuilderModel) => {
    onSelectImage(out, item.id)
  }

  const currentComponent = useMemo(() => {
    if (item.type === 'image') {
      return (
        <div className="h-full flex items-center">
          <img src={item.componentName} className="mx-auto" />
        </div>
      )
    }

    if (item.componentName) {
      const Component = getComponentByName(item.componentName)

      if (Component) {
        return <Component {...item.props} />
      } else {
        return <></>
      }
    }
  }, [item])

  const currentStyle = useMemo(() => {
    return item.props?.style
      ? {
          paddingLeft: `${(item.props.style as Record<string, unknown>)?.paddingLeft}px`,
          paddingRight: `${(item.props.style as Record<string, unknown>)?.paddingRight}px`,
          paddingTop: `${(item.props.style as Record<string, unknown>)?.paddingTop}px`,
          paddingBottom: `${(item.props.style as Record<string, unknown>)?.paddingBottom}px`
        }
      : {}
  }, [item])

  return (
    <div
      draggable
      className={cn(
        'w-full cursor-move h-full',
        className && className,
        item.isFocused && 'outline-1 outline outline-sky-500',
        !item.componentName && 'shadow-column-sm'
      )}
      onDragStart={handleDragStart}
      onDragOver={handleOver}
      onDrop={handleDropEnd}
    >
      {item.componentName ? (
        <div
          className={cn(
            'w-full relative group/close h-full',
            item.props?.className ? (item.props?.className as string) : ''
          )}
          style={currentStyle}
        >
          <button
            className="absolute top-2 right-2 z-30 bg-white rounded-full hidden group-hover/close:inline-block transition-all"
            onClick={() => {
              onRemoveElement(item.id)
            }}
          >
            <CircleX className="text-red-600" />
          </button>
          {currentComponent}
        </div>
      ) : (
        <div className="w-full min-h-24 h-full flex items-center justify-center">
          <PlusElement
            listElements={LIST_ELEMENTS_EXAMPLE}
            handleSelectElement={handleSelectElement}
            handleSelectImage={handleSelectImage}
          />
        </div>
      )}
    </div>
  )
}

export default DragDropItem
