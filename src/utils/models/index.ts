import { LucideIcon } from 'lucide-react'

export interface ElementModel {
  name: string
  label: string
  value: string
  icon?: LucideIcon
  type?: 'component' | 'image'
  pageBuilderId?: string
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
  props?: Record<string, unknown>
  type?: 'component' | 'image'
  pageBuilderId?: string
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

export interface LayoutState {
  pastLayouts: RowModel[][]
  presentLayout: RowModel[]
  futureLayouts: RowModel[][]
}

export interface UndoRedoStateModel {
  pastLayouts: RowModel[][]
  futureLayouts: RowModel[][]
}

export interface OutputPageBuilderModel {
  id: string
  url: string
}
