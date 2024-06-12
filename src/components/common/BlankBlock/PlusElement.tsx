import { SquarePlus } from 'lucide-react'
import { ElementModel } from 'src/libs/models'
import { buttonVariants } from 'src/shadcn/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from 'src/shadcn/components/ui/dialog'
import { cn } from 'src/shadcn/lib/utils'

type Props = {
  listElements: ElementModel[]
  handleSelectElement: (element: ElementModel) => void
}

const PlusElement: React.FC<Props> = ({ listElements, handleSelectElement }) => {
  // function
  const handleClickElement = (element: ElementModel) => {
    handleSelectElement(element)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>
          <SquarePlus className="text-gray-500" />
        </button>
      </DialogTrigger>
      <DialogContent className="min-w-[250px]">
        <DialogHeader>
          <DialogTitle>Select a element</DialogTitle>
        </DialogHeader>
        <nav className="grid gap-4 grid-cols-2 group-[[data-collapsed=true]]:justify-center">
          {listElements.map((element, index) => (
            <button
              key={index}
              className={cn(
                buttonVariants({ variant: 'outline', size: 'sm' }),
                'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white justify-start'
              )}
              onClick={() => handleClickElement(element)}
            >
              {element.name}
            </button>
          ))}
        </nav>
      </DialogContent>
    </Dialog>
  )
}

export default PlusElement
