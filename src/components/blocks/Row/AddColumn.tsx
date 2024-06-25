import { CirclePlus } from 'lucide-react'

import { LIST_ROW_LAYOUTS } from 'src/constants'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/shadcn/components/dialog'

type Props = {
  onChoseLayout: (layout: string) => void
}

const AddColumn: React.FC<Props> = ({ onChoseLayout }) => {
  // functions
  const handleChoseLayout = (layout: string) => {
    onChoseLayout(layout)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>
          <CirclePlus className="text-gray-500" />
        </button>
      </DialogTrigger>
      <DialogContent className="min-w-[250px]">
        <DialogHeader>
          <DialogTitle>Select a layout</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-y-6">
          {LIST_ROW_LAYOUTS.map(l => (
            <div className="" key={`row-layout-${l.id}`}>
              <button className="w-10 hover:shadow-2xl duration-300" onClick={() => handleChoseLayout(l.value)}>
                <l.icon />
              </button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddColumn
