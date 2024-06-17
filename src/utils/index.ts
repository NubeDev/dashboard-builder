import { store } from 'src/store/store'
import { elementsLayoutSlice } from 'src/store/elements-layout'
import { RowModel, UndoRedoModel } from './models'
import {
  TableDemo,
  OverviewChart,
  DemoGithub,
  DatePickerDemo,
  CardsTeamMembers,
  CardsStatus,
  CardsCookieSettings,
  CardsActivityGoal
} from 'src/examples'

import Logo from 'src/components/common/Logo'
import MenuHeader from 'src/components/blocks/Headers/Menu'
import MenuFooter from 'src/components/blocks/Footers/Menu'

export const getArrayBooleanByCurrentLayout = (currentLayout: string) => {
  if (currentLayout.includes('_')) {
    const arr = currentLayout.split('_')
    const len = arr.length || 0

    return Array(len).fill(false)
  }

  return Array(Number(currentLayout)).fill(false)
}

export const saveCurrentListLayout = (list: RowModel[]) => {
  const currentListJSON = localStorage.getItem('undo_redo_stacks')
  const currentList = currentListJSON ? (JSON.parse(currentListJSON) as UndoRedoModel[]) : []
  const listIndex = currentList.map(l => l.id)
  const newOp: UndoRedoModel = {
    id: listIndex?.length > 0 ? Math.max(...listIndex) + 1 : 1,
    type: 'undo',
    row: list,
    isCurrent: true
  }
  currentList.forEach(c => (c.isCurrent = false))

  if (currentList.length >= 10) {
    const newList = [...currentList.slice(1), newOp]
    localStorage.setItem('undo_redo_stacks', JSON.stringify(newList))
  } else {
    currentList.push(newOp)
    localStorage.setItem('undo_redo_stacks', JSON.stringify(currentList))
  }
}

export const getCurrentListLayout = (): RowModel[] | null => {
  const listJSON = localStorage.getItem('undo_redo_stacks')
  const oldList = listJSON ? (JSON.parse(listJSON) as UndoRedoModel[]) : []

  return oldList.find(l => l.isCurrent)?.row || null
}

export const getComponentByName = (name: string) => {
  switch (name) {
    case 'logo':
      return Logo
    case 'menu_header':
      return MenuHeader
    case 'menu_footer':
      return MenuFooter
    case 'table':
      return TableDemo
    case 'cookie_settings':
      return CardsCookieSettings
    case 'overview_chart':
      return OverviewChart
    case 'cards_status':
      return CardsStatus
    case 'cards_activity_goal':
      return CardsActivityGoal
    case 'demo_github':
      return DemoGithub
    case 'cards_team_members':
      return CardsTeamMembers
    case 'date_picker_demo':
      return DatePickerDemo
  }
}
