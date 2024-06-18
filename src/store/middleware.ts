import { RootState } from './store'
import { Middleware } from '@reduxjs/toolkit'
import { undo, redo } from './elements-layout'
import { UndoRedoStateModel } from 'src/utils/models'

export const localStorageLayoutMiddleware: Middleware<{}, RootState> = store => next => action => {
  if (![undo.type, redo.type].includes((action as any).type)) {
    const listLayoutsJSON = localStorage.getItem('undo_redo_stacks')

    const listLayouts = listLayoutsJSON
      ? (JSON.parse(listLayoutsJSON) as UndoRedoStateModel) || { pastLayouts: [], futureLayouts: [] }
      : { pastLayouts: [], futureLayouts: [] }
    const currentLayout = store.getState().elementsLayout.listElements

    listLayouts.futureLayouts = []
    listLayouts.pastLayouts = [...listLayouts.pastLayouts, currentLayout].slice(-10)

    localStorage.setItem('undo_redo_stacks', JSON.stringify(listLayouts))
  }

  return next(action)
}
