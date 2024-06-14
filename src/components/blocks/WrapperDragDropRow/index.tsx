import { RowModel } from 'src/utils/models'

type Props = {
  children: React.ReactNode
  currentRow: RowModel
  onDragRow: (rowId: string, columnId: string, fromElement: string) => void
  onDropRow: (rowId: string) => void
}

const WrapperDragDropRow = ({ children, currentRow, onDragRow, onDropRow }: Props) => {
  // functions
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    onDragRow(currentRow.id, '', 'row')
    e.stopPropagation()
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDrop = () => {
    onDropRow(currentRow.id)
  }

  return (
    <div
      draggable
      className="row-draggable"
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {children}
    </div>
  )
}

export default WrapperDragDropRow
