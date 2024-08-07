import { Plus } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { useEffect, useRef, useState } from 'react'

import styled from 'styled-components'

import { Button } from '@/shadcn/components/button'
import { addRow } from '@/store/elements-layout'
import { ElementModel, RowModel } from '@/utils/models'

import ImportButton from './ImportButton'
import AddElementExpandingSection from './AddElementExpanding'

const SidebarContainer = styled.aside`
  width: 100px;
  color: #ffffff;
  padding: 16px;
  position: fixed;
  height: 100vh;
  text-align: center;
  z-index: 150;
`

const LeftSidebar = () => {
  // const
  const dispatch = useDispatch()

  // refs
  const containerRef = useRef<HTMLDivElement>(null)

  // states
  const [isExpanded, setIsExpanded] = useState(false)

  // functions
  const closeExpandingSection = () => {
    setIsExpanded(false)
  }

  const handleAddElement = (element: ElementModel) => {
    console.log(element)
    setIsExpanded(false)
    const newElement: RowModel = {
      id: uuidv4(),
      column: [],
      parentId: uuidv4()
    }

    dispatch(addRow(newElement))
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        closeExpandingSection()
      }
    }

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isExpanded])

  return (
    <div className="relative" ref={containerRef}>
      <SidebarContainer className="bg-current">
        <h2 className="font-bold mb-4 text-black">Nube iO</h2>
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center w-full"
        >
          <Plus className="size-5 shrink-0 text-black" />
          <span className="text-sm text-black">Add</span>
        </Button>

        <ImportButton />
      </SidebarContainer>

      <AddElementExpandingSection
        isExpanded={isExpanded}
        onAddElement={element => {
          handleAddElement(element)
        }}
        closeExpandingSection={closeExpandingSection}
      />
    </div>
  )
}

export default LeftSidebar
