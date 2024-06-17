import { LucideIcon } from 'lucide-react'

export interface ElementModel {
  name: string
  label: string
  value: string
  icon?: LucideIcon
}

export interface SelectedElementModel extends ElementModel {
  id: string
}

export interface DragItemModel {
  id: string
  name?: string
  className?: string
  isFocused?: boolean
  component?: () => JSX.Element
  componentName?: string
  props?: any
}

export interface RowLayoutModel {
  id: number
  name: string
  value: string
  className?: string
  items?: DragItemModel[]
  icon: () => JSX.Element
}

export interface RowModel {
  id: string
  column: DragItemModel[]
  parentId?: string
  position?: string
  isFocused?: boolean
  currentLayout?: string
}

export interface UndoRedoModel {
  id: number
  type?: 'undo' | 'redo'
  row: RowModel[]
  isCurrent: boolean
}
