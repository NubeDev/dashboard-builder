import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { cn } from 'src/shadcn/lib/utils'
import { Button } from 'src/shadcn/components/ui/button'
import { RowModel } from 'src/utils/models'
import { LIST_ROW_LAYOUTS } from 'src/constants'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from 'src/shadcn/components/ui/dialog'
import { changeRowLayout } from 'src/store/elements-layout'

type Props = {
  isOpen: boolean
  currentRow: RowModel
  openChange: () => void
}

const EditRowPopup = ({ isOpen, openChange, currentRow }: Props) => {
  // const
  const dispatch = useDispatch()

  // state
  const [layout, setLayout] = useState(currentRow.currentLayout)

  // functions
  const handleSaveChange = () => {
    const newListColumns = LIST_ROW_LAYOUTS.find(item => item.value === layout)?.items || []
    dispatch(changeRowLayout({ rowId: currentRow.id, newListColumns: newListColumns }))
    openChange()
  }

  return (
    <Dialog open={isOpen} onOpenChange={openChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit row</DialogTitle>
        </DialogHeader>
        <div>
          <h3 className="font-semibold mb-6">Choose another layout</h3>
          <div className="grid grid-cols-3 gap-y-6 gap-x-4">
            {LIST_ROW_LAYOUTS.map(l => (
              <div
                key={`row-layout-${l.id}`}
                className={cn(
                  'flex items-center justify-center p-2 rounded transition-all',
                  layout === l.value && 'bg-sky-300'
                )}
              >
                <div className="w-full">
                  <button
                    className="hover:shadow-2xl duration-300 w-full flex items-center justify-center"
                    onClick={() => setLayout(l.value)}
                  >
                    <l.icon />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-right">
            <Button type="button" onClick={handleSaveChange}>
              Save change
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditRowPopup
