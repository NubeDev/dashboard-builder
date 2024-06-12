import { RowModel } from './models'

export const getCurrentElementById = (listItems: RowModel[], id: string, elementType: string) => {
  if (elementType.toLocaleLowerCase() === 'row') {
  } else if (elementType.toLocaleLowerCase() === 'column') {
  } else {
  }
}
