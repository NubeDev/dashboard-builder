import { CircleX } from 'lucide-react'
import { useState } from 'react'

import { cn } from '@/lib/utils'
import { ElementModel } from 'src/utils/models'
import { LIST_ELEMENTS_EXAMPLE } from 'src/constants'

import PlusElement from './PlusElement'

type Props = {
  className?: string
  positionIndex: number
  onRemoveOrAddElement?: (index: number, value: boolean) => void
}

const BlankBlock: React.FC<Props> = ({ className = '', positionIndex, onRemoveOrAddElement }) => {
  // state
  const [selectedElement, setSelectedElement] = useState<ElementModel | null>(null)

  // function
  const handleSelectElement = (element: ElementModel) => {
    setSelectedElement({ ...element })
    onRemoveOrAddElement && onRemoveOrAddElement(positionIndex, true)
  }

  return (
    <div className={cn('w-full', className && className)}>
      {selectedElement ? (
        <div className="w-full relative group/item">
          <button
            className="absolute top-2 right-2 z-30 bg-white rounded-full hidden group-hover/item:inline-block transition-all"
            onClick={() => {
              setSelectedElement(null)
              onRemoveOrAddElement && onRemoveOrAddElement(positionIndex, false)
            }}
          >
            <CircleX className="text-red-600" />
          </button>
        </div>
      ) : (
        <div className="w-full min-h-[150px] border border-dashed border-indigo-500 rounded-md flex items-center justify-center">
          <PlusElement listElements={LIST_ELEMENTS_EXAMPLE} handleSelectElement={handleSelectElement} />
        </div>
      )}
    </div>
  )
}

export default BlankBlock
