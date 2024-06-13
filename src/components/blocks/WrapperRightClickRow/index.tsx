import { useDispatch, useSelector } from 'react-redux'
import { ClipboardPaste, CopyPlus, FilePenLine, Folders, Trash2 } from 'lucide-react'

import { RowModel } from 'src/utils/models'
import { RootState } from 'src/store/store'
import { addRowByCopy, removeRow } from 'src/store/elements-layout'
import { TempComponentsModel, addCopyToTempList, removeCopyFromTempList } from 'src/store/temp-list-components'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger
} from 'src/shadcn/components/ui/context-menu'

interface Props {
  children: React.ReactElement
  currentRow: RowModel
}

const WrapperRightClickRow = ({ children, currentRow }: Props) => {
  // const
  const dispatch = useDispatch()
  const tempComponents = useSelector((state: RootState) => state.tempListComponents.listTempComponents)
  const disabledPaste = tempComponents.find(t => t.type === 'copy' && t.from === 'row') ? false : true

  // functions
  const handleCopyRow = () => {
    const tempCopyRow: TempComponentsModel = {
      id: currentRow.id,
      rowId: currentRow.id,
      type: 'copy',
      time: new Date().toISOString(),
      from: 'row'
    }
    dispatch(addCopyToTempList(tempCopyRow))
  }

  const handlePasteRow = () => {
    const copyRow = tempComponents.find(t => t.type === 'copy' && t.from === 'row')

    if (copyRow) {
      dispatch(addRowByCopy({ rowId: currentRow.id, copyRowId: copyRow.rowId }))
      dispatch(removeCopyFromTempList())
    }
  }

  const handleDeleteRow = () => {
    dispatch(removeRow(currentRow.id))
  }

  const handleDuplicateRow = () => {
    dispatch(addRowByCopy({ rowId: currentRow.id, copyRowId: currentRow.id }))
  }

  const handleEditRow = () => {
    console.log('edit row')
  }

  const disabledEditRow = !currentRow.column || currentRow.column.length === 0

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem onSelect={handleCopyRow}>
          Copy
          <ContextMenuShortcut>
            <Folders className="size-4" />
          </ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem disabled={disabledPaste} onSelect={handlePasteRow}>
          Paste
          <ContextMenuShortcut>
            <ClipboardPaste className="size-4" />
          </ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuItem disabled={disabledEditRow} onSelect={handleEditRow}>
          Edit
          <ContextMenuShortcut>
            <FilePenLine className="size-4" />
          </ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuItem onSelect={handleDuplicateRow}>
          Duplicate
          <ContextMenuShortcut>
            <CopyPlus className="size-4" />
          </ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem onSelect={handleDeleteRow}>
          Delete
          <ContextMenuShortcut>
            <Trash2 className="size-4" />
          </ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default WrapperRightClickRow
