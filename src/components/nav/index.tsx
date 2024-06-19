import { cn } from '@/lib/utils'
import { buttonVariants } from '@/shadcn/components/button'
import { ElementModel } from '@/utils/models'

type Props = {
  listBlock: ElementModel[]
  onClickBlock: (block: ElementModel) => void
}

export function Nav({ listBlock, onClickBlock }: Props) {
  return (
    <div className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
      <nav className="grid gap-1 group-[[data-collapsed=true]]:justify-center">
        {listBlock.map((block, index) => (
          <button
            key={`code-block-${index}`}
            className={cn(
              buttonVariants({ variant: 'outline', size: 'sm' }),
              'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white justify-start'
            )}
            onClick={() => onClickBlock(block)}
          >
            {block.icon && <block.icon className="mr-2 h-4 w-4" />}
            {block.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
