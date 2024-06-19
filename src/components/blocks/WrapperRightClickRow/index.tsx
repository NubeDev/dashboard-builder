import { useDispatch, useSelector } from 'react-redux'
import { ClipboardPaste, CopyPlus, FilePenLine, Folders, Redo2, Trash2, Undo2 } from 'lucide-react'

import { RowModel } from '@/utils/models'
import { RootState } from '@/store/store'
import { addRowByCopy, redo, removeRow, undo } from '@/store/elements-layout'
import { TempComponentsModel, addCopyToTempList, removeCopyFromTempList } from '@/store/temp-list-components'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger
} from '@/shadcn/components/context-menu'

interface Props {
  children: React.ReactElement
  currentRow: RowModel
  onEdit: () => void
}

const WrapperRightClickRow = ({ children, currentRow, onEdit }: Props) => {
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
    onEdit()
  }

  const handleUndo = () => {
    dispatch(undo())
  }

  const handleRedo = () => {
    dispatch(redo())
  }

  const disabledEditRow = !currentRow.column || currentRow.column.length === 0

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem onSelect={handleCopyRow}>
          Copy row
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

        <ContextMenuItem onSelect={handleUndo}>
          Undo
          <ContextMenuShortcut>
            <Undo2 className="size-4" />
          </ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuItem onSelect={handleRedo}>
          Redo
          <ContextMenuShortcut>
            <Redo2 className="size-4" />
          </ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuItem disabled={disabledEditRow} onSelect={handleEditRow}>
          Update layout
          <ContextMenuShortcut>
            <FilePenLine className="size-4" />
          </ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuItem onSelect={handleDuplicateRow}>
          Duplicate row
          <ContextMenuShortcut>
            <CopyPlus className="size-4" />
          </ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem onSelect={handleDeleteRow}>
          Remove row
          <ContextMenuShortcut>
            <Trash2 className="size-4" />
          </ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default WrapperRightClickRow
