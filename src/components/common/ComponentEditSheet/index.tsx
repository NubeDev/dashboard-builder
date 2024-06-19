import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'

import { Input } from '@/shadcn/components/input'
import { Label } from '@/shadcn/components/label'
import { Button } from '@/shadcn/components/button'
import { DragItemModel } from '@/utils/models'
import { changeComponentPropByColumnId } from '@/store/elements-layout'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/shadcn/components/sheet'

type Props = {
  isShowSheet: boolean
  currentComponent: DragItemModel | null
  onChange: () => void
}

const ComponentEditSheet = ({ isShowSheet, currentComponent, onChange }: Props) => {
  // const
  const dispatch = useDispatch()

  // state
  const [title, setTitle] = useState('')

  // functions
  const handleSaveChanges = () => {
    const newComponent = { ...currentComponent, props: { ...currentComponent?.props, title } }
    dispatch(changeComponentPropByColumnId(newComponent as DragItemModel))
    onChange()
    setTitle('')
  }

  // effect
  useEffect(() => {
    if (currentComponent && currentComponent?.props?.title) {
      setTitle(currentComponent?.props?.title)
    }
  }, [currentComponent])

  return (
    <Sheet open={isShowSheet} onOpenChange={onChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit component</SheetTitle>
          <SheetDescription>Make changes to your component here. Click save when you're done.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Enter a title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <div className="mt-10 text-right">
          <Button type="button" onClick={handleSaveChanges}>
            Save changes
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default ComponentEditSheet
