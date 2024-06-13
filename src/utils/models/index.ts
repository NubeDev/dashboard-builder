import { LucideIcon } from 'lucide-react'

export interface ElementModel {
  name: string
  icon?: LucideIcon
  type?: string
  element: () => JSX.Element
  label: string
  position?: string
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
}
