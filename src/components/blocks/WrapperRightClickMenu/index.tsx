import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import { ClipboardPaste, Copy, Trash2, Undo2, Redo2 } from 'lucide-react'

import { RootState } from '@/store/store'
import { TreeDataItem } from '@/shadcn/components/tree'
import { DragItemModel } from '@/utils/models'
import { TempMenuModel, addTempMenu } from '@/store/temp-list-menus'
import {
  addColumnByColumnIdAndColumnElement,
  addColumnByRowIdAndColumnElement,
  addRowByCopy,
  redo,
  removeElementFromColumnByColumnId,
  removeRow,
  undo
} from '@/store/elements-layout'
import {
  ContextMenuContent,
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuItem,
  ContextMenuShortcut
} from '@/shadcn/components/context-menu'

interface Props {
  children: React.ReactElement
  item: TreeDataItem
}

const WrapperRightClickMenu = (props: Props) => {
  // const
  const dispatch = useDispatch()
  const tempMenusList = useSelector((state: RootState) => state.tempListMenus.listTempMenus)

  // functions
  const handleCopy = () => {
    const tempItem: TempMenuModel = {
      id: uuidv4(),
      type: 'copy',
      tempId: props.item.id,
      position: props.item.type,
      tempComponent: props.item.currentComponent
    }
    dispatch(addTempMenu(tempItem))
  }

  const handlePaste = () => {
    const tempCopyItem = tempMenusList.find(tem => tem.type === 'copy')
    if (props.item.type === 'row') {
      if (tempCopyItem?.position === 'row') {
        dispatch(addRowByCopy({ rowId: props.item.id, copyRowId: tempCopyItem.tempId }))
      } else if (tempCopyItem?.position === 'column' || tempCopyItem?.position === 'element') {
        dispatch(
          addColumnByRowIdAndColumnElement({
            rowId: props.item.id,
            columnElement: tempCopyItem.tempComponent as DragItemModel
          })
        )
      }
    } else if (props.item.type === 'column') {
      if (tempCopyItem?.position === 'row') {
        toast.error('Can not paste row to column')
      } else if (tempCopyItem?.position === 'column' || tempCopyItem?.position === 'element') {
        dispatch(
          addColumnByColumnIdAndColumnElement({
            columnId: props.item.id,
            columnElement: tempCopyItem.tempComponent as DragItemModel
          })
        )
      }
    }
  }

  const handleDelete = () => {
    if (props.item.type === 'row') {
      dispatch(removeRow(props.item.id))
    } else if (props.item.type === 'column') {
      dispatch(removeElementFromColumnByColumnId({ columnId: props.item.id }))
    } else if (props.item.type === 'element') {
      dispatch(removeElementFromColumnByColumnId({ columnId: props.item.parentId as string }))
    }
  }

  const handleUndo = () => {
    dispatch(undo())
  }

  const handleRedo = () => {
    dispatch(redo())
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>{props.children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem onSelect={handleCopy}>
          Copy
          <ContextMenuShortcut>
            <Copy className="size-4" />
          </ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem onSelect={handlePaste}>
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

        <ContextMenuItem onSelect={handleDelete}>
          Delete
          <ContextMenuShortcut>
            <Trash2 className="size-4" />
          </ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default WrapperRightClickMenu
