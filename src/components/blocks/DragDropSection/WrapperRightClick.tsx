import { useDispatch } from 'react-redux'
import { ClipboardPaste, Copy, CopyPlus, FilePenLine, Trash } from 'lucide-react'

import { cn } from 'src/shadcn/lib/utils'
import { DragItemModel } from 'src/utils/models'
import { addColumnByDuplicate } from 'src/store/elements-layout'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger
} from 'src/shadcn/components/ui/context-menu'

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
    console.log(props.item)
    dispatch(addColumnByDuplicate(props.item as DragItemModel))
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
