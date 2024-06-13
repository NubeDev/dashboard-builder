import { ClipboardPaste, Copy, Trash2, Folders, Trash, FilePenLine } from 'lucide-react'

import { cn } from 'src/shadcn/lib/utils'
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
  onCopyRow: (item: T) => void
  onCopyColumn: (item: T, action: string) => void
  onEdit: (item: T) => void
  onPaste: (item: T) => void
  onDeleteColumn: (item: T) => void
  onDeleteRow: () => void
}

const WrapperRightClick = <T,>(props: Props<T>) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger className={cn('w-full', props.className)}>{props.children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem onSelect={() => props.onCopyRow(props.item)}>
          Copy row
          <ContextMenuShortcut>
            <Folders className="size-4" />
          </ContextMenuShortcut>
        </ContextMenuItem>
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
        <ContextMenuItem onSelect={() => props.onEdit(props.item)}>
          Edit
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

        <ContextMenuItem onSelect={() => props.onDeleteRow()}>
          Delete row
          <ContextMenuShortcut>
            <Trash2 className="size-4" />
          </ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuItem disabled={!props.isDisabledCopy} onSelect={() => props.onDeleteColumn(props.item)}>
          Delete column
          <ContextMenuShortcut>
            <Trash className="size-4" />
          </ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default WrapperRightClick
