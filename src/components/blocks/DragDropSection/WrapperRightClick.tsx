import { useDispatch } from 'react-redux'
import { ClipboardPaste, Copy, CopyPlus, FilePenLine, Trash, Undo2, Redo2 } from 'lucide-react'

import { cn } from '@/lib/utils'
import { addColumnByDuplicate, undo, redo } from '@/store/elements-layout'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger
} from '@/shadcn/components/context-menu'
import { DragItemModel } from '@/utils/models'

interface Props<T> {
  children: React.ReactElement
  item: T
  isDisabledCopy?: boolean
  isDisabledPaste?: boolean
  className?: string
  onCopyColumn: (item: T, action: string) => void
  onEdit: (item: T) => void
  onPaste: (item: T) => void
  onDeleteColumn: (item: T) => void
}

const WrapperRightClick = <T,>(props: Props<T>) => {
  // const
  const dispatch = useDispatch()

  // functions
  const handleDuplicateRow = () => {
    dispatch(addColumnByDuplicate(props.item as DragItemModel))
  }

  const handleUndo = () => {
    dispatch(undo())
  }

  const handleRedo = () => {
    dispatch(redo())
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger className={cn('w-full', props.className)}>{props.children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem
          disabled={!props.isDisabledCopy}
          onSelect={() => {
            props.onCopyColumn && props.onCopyColumn(props.item, 'copy')
          }}
        >
          Copy component
          <ContextMenuShortcut>
            <Copy className="size-4" />
          </ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem disabled={!props.isDisabledCopy} onSelect={() => props.onEdit(props.item)}>
          Edit component
          <ContextMenuShortcut>
            <FilePenLine className="size-4" />
          </ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuItem
          disabled={props.isDisabledPaste}
          onSelect={() => {
            props.onPaste && props.onPaste(props.item)
          }}
        >
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

        <ContextMenuItem disabled={!(props.item as DragItemModel).component} onSelect={handleDuplicateRow}>
          Duplicate component
          <ContextMenuShortcut>
            <CopyPlus className="size-4" />
          </ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuItem disabled={!props.isDisabledCopy} onSelect={() => props.onDeleteColumn(props.item)}>
          Remove component
          <ContextMenuShortcut>
            <Trash className="size-4" />
          </ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default WrapperRightClick
