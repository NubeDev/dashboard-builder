import { CircleX } from 'lucide-react'
import { useState, useEffect } from 'react'

import { getArrayBooleanByCurrentLayout } from 'src/libs/hooks'

import BlankBlock from 'src/components/common/BlankBlock'

type Props = {
  currentLayout: string
  setCurrentLayout: React.Dispatch<React.SetStateAction<string | null>>
}

const SelectLayout: React.FC<Props> = ({ currentLayout, setCurrentLayout }) => {
  // state
  const [isShowClose, setIsShowClose] = useState<boolean>(true)
  const [columnArray, setColumnArray] = useState<boolean[]>(getArrayBooleanByCurrentLayout(currentLayout))

  // functions
  const handleSetColumnArray = (index: number, value: boolean) => {
    const newColumnArray = [...columnArray]
    newColumnArray[index] = value
    setColumnArray(newColumnArray)
  }

  // effect
  useEffect(() => {
    const isShowClose = columnArray?.every(item => !item)
    setIsShowClose(isShowClose)
  }, [columnArray])

  return (
    <div className="w-full relative flex gap-2">
      {isShowClose && (
        <button className="absolute top-2 right-2" onClick={() => setCurrentLayout(null)}>
          <CircleX className="text-red-600" />
        </button>
      )}
      {currentLayout === '1' && <BlankBlock positionIndex={0} onRemoveOrAddElement={handleSetColumnArray} />}
      {currentLayout === '2' && (
        <>
          <BlankBlock className="flex-1" positionIndex={0} onRemoveOrAddElement={handleSetColumnArray} />
          <BlankBlock className="flex-1" positionIndex={1} onRemoveOrAddElement={handleSetColumnArray} />
        </>
      )}
      {currentLayout === '3' && (
        <>
          <BlankBlock className="flex-1" positionIndex={0} onRemoveOrAddElement={handleSetColumnArray} />
          <BlankBlock className="flex-1" positionIndex={1} onRemoveOrAddElement={handleSetColumnArray} />
          <BlankBlock className="flex-1" positionIndex={2} onRemoveOrAddElement={handleSetColumnArray} />
        </>
      )}
      {currentLayout === '4' && (
        <>
          <BlankBlock className="flex-1" positionIndex={0} onRemoveOrAddElement={handleSetColumnArray} />
          <BlankBlock className="flex-1" positionIndex={1} onRemoveOrAddElement={handleSetColumnArray} />
          <BlankBlock className="flex-1" positionIndex={2} onRemoveOrAddElement={handleSetColumnArray} />
          <BlankBlock className="flex-1" positionIndex={3} onRemoveOrAddElement={handleSetColumnArray} />
        </>
      )}
      {currentLayout === '1_2' && (
        <>
          <BlankBlock className="flex-1" positionIndex={0} onRemoveOrAddElement={handleSetColumnArray} />
          <BlankBlock className="flex-[2]" positionIndex={1} onRemoveOrAddElement={handleSetColumnArray} />
        </>
      )}
      {currentLayout === '2_1' && (
        <>
          <BlankBlock className="flex-[2]" positionIndex={0} onRemoveOrAddElement={handleSetColumnArray} />
          <BlankBlock className="flex-1" positionIndex={1} onRemoveOrAddElement={handleSetColumnArray} />
        </>
      )}
      {currentLayout === '1_3' && (
        <>
          <BlankBlock className="flex-1" positionIndex={0} onRemoveOrAddElement={handleSetColumnArray} />
          <BlankBlock className="flex-[3]" positionIndex={1} onRemoveOrAddElement={handleSetColumnArray} />
        </>
      )}
      {currentLayout === '1_2_1' && (
        <>
          <BlankBlock className="flex-1" positionIndex={0} onRemoveOrAddElement={handleSetColumnArray} />
          <BlankBlock className="flex-[2]" positionIndex={1} onRemoveOrAddElement={handleSetColumnArray} />
          <BlankBlock className="flex-1" positionIndex={2} onRemoveOrAddElement={handleSetColumnArray} />
        </>
      )}
      {currentLayout === '3_1' && (
        <>
          <BlankBlock className="flex-[3]" positionIndex={0} onRemoveOrAddElement={handleSetColumnArray} />
          <BlankBlock className="flex-1" positionIndex={1} onRemoveOrAddElement={handleSetColumnArray} />
        </>
      )}
    </div>
  )
}

export default SelectLayout
