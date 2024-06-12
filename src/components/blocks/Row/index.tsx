import { useState } from 'react'

import AddColumn from './AddColumn'
import SelectLayout from '../SelectLayout'

const Row = () => {
  // state
  const [currentLayout, setCurrentLayout] = useState<string | null>(null) // default layout is 1

  // functions
  const handleChoseLayout = (layout: string) => {
    setCurrentLayout(layout)
  }

  return (
    <div className="w-full">
      {currentLayout ? (
        <SelectLayout currentLayout={currentLayout} setCurrentLayout={setCurrentLayout} />
      ) : (
        <div className="min-h-[100px] w-full border border-dashed border-gray-300 rounded-lg flex items-center justify-center">
          <AddColumn onChoseLayout={handleChoseLayout} />
        </div>
      )}
    </div>
  )
}

export default Row
