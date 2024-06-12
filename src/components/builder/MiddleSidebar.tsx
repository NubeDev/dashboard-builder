import { v4 as uuidv4 } from 'uuid'
import { Columns2, Puzzle, Rows2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'

import styled from 'styled-components'

import { Tree } from 'src/shadcn/components/ui/tree'
import { RootState } from 'src/store/store'
import { onFocusToItem } from 'src/store/elements_layout'

import type { TreeDataItem } from 'src/shadcn/components/ui/tree'

const Sidebar = styled.aside`
  margin-left: 100px;
  width: 300px;
  background-color: #f7fafc;
  padding: 1rem;
  position: fixed;
  height: 100vh;
  overflow-y: hidden;
`

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 16px;
`

const MiddleSidebar = () => {
  // const
  const dispatch = useDispatch()
  const listRowsElement = useSelector((state: RootState) => state.elementsLayout.listElements)

  const newListRowsTree: TreeDataItem[] = listRowsElement.map(row => ({
    id: row.id,
    name: 'Row',
    type: 'row',
    icon: Rows2,
    children:
      row.column?.length > 0
        ? [
            ...row.column.map(col => ({
              id: col.id,
              name: 'Column',
              icon: Columns2,
              type: 'column',
              parentId: row.id,
              children: col.component
                ? [
                    {
                      id: uuidv4(),
                      name: `${col.component.name}.tsx`,
                      icon: Puzzle,
                      type: 'element',
                      parentId: col.id,
                      hightParentId: row.id,
                      currentComponent: col
                    }
                  ]
                : undefined,
              currentComponent: col
            }))
          ]
        : undefined,
    currentComponent: row
  }))

  const handleSelect = (item: TreeDataItem | undefined) => {
    if (!item) return

    if (item.type === 'element') {
      dispatch(onFocusToItem({ id: item.parentId || '', elementType: 'column', parentId: item.hightParentId }))
      return
    }

    dispatch(onFocusToItem({ id: item?.id, elementType: item.type || '', parentId: item.parentId }))
  }

  // state

  return (
    <Sidebar className="flex flex-col">
      <Title className="shrink-0">Layers</Title>
      <Tree
        data={newListRowsTree}
        className="grow h-full"
        initialSelectedItemId="f12"
        onSelectChange={handleSelect}
        folderIcon={Rows2}
        itemIcon={Columns2}
      />
    </Sidebar>
  )
}

export default MiddleSidebar
