import { useState } from 'react'
import { SquarePlus } from 'lucide-react'

import { cn } from '@/lib/utils'
import { ElementModel, OutputPageBuilderModel } from '@/utils/models'
import { buttonVariants } from '@/shadcn/components/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/shadcn/components/dialog'

import PageBuilder from '@/components/blocks/PageBuilder'

type Props = {
  listElements: ElementModel[]
  handleSelectElement: (element: ElementModel) => void
  handleSelectImage?: (out: OutputPageBuilderModel) => void
}

const PlusElement: React.FC<Props> = ({ listElements, handleSelectElement, handleSelectImage }) => {
  // states
  const [openPageBuilder, setOpenPageBuilder] = useState(false)

  // functions
  const handleClickElement = (element: ElementModel) => {
    handleSelectElement(element)
  }

  const handleOpenPageBuilder = () => {
    setOpenPageBuilder(true)
  }

  const handleSaveImage = (out: OutputPageBuilderModel) => {
    handleSelectImage && handleSelectImage(out)
  }

  return (
    <>
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
            <button
              className={cn(
                buttonVariants({ variant: 'outline', size: 'sm' }),
                'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white justify-start'
              )}
              onClick={handleOpenPageBuilder}
            >
              Grapics builder
            </button>
          </nav>
        </DialogContent>
      </Dialog>

      <Dialog open={openPageBuilder} onOpenChange={() => setOpenPageBuilder(false)}>
        <DialogContent className="max-w-[calc(100vw-100px)] w-full h-[80vh] mx-auto z-[99999999]">
          <DialogHeader>
            <DialogTitle>Page Builder</DialogTitle>
          </DialogHeader>
          <PageBuilder handleSaveImage={handleSaveImage} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default PlusElement
