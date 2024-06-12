import { EditIconSvg } from 'src/icons'
import { CoreComponentType } from 'src/pages/Builder'
import { Input } from 'src/shadcn/components/ui/input'
import { Label } from 'src/shadcn/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from 'src/shadcn/components/ui/popover'

type EditStyleButtonIconProps = {
  elementButton: CoreComponentType
  handEditElement: (e: CoreComponentType) => void
}

const EditStyleButtonIcon: React.FC<EditStyleButtonIconProps> = ({ elementButton, handEditElement }) => {
  const handleEditClick = () => {}

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button onClick={handleEditClick}>
          <EditIconSvg />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Custom style and css</h4>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Label value:</Label>
              <Input
                id="width"
                value={elementButton.labelValue}
                className="col-span-2 h-8"
                onChange={e => {
                  handEditElement({ ...elementButton, labelValue: e.target.value })
                }}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Max. width</Label>
              <Input id="maxWidth" defaultValue="300px" className="col-span-2 h-8" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height</Label>
              <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Max. height</Label>
              <Input id="maxHeight" defaultValue="none" className="col-span-2 h-8" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default EditStyleButtonIcon
