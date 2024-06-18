import { FileUp } from 'lucide-react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { Label } from 'src/shadcn/components/ui/label'
import { Input } from 'src/shadcn/components/ui/input'
import { Button } from 'src/shadcn/components/ui/button'
import { addNewLayout } from 'src/store/elements-layout'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from 'src/shadcn/components/ui/dialog'

const ImportButton = () => {
  const dispatch = useDispatch()

  // states
  const [isOpen, setIsOpen] = useState(false)

  // functions

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files)
    if (e?.target?.files && e.target.files[0]) {
      const fileReader = new FileReader()
      fileReader.readAsText(e.target.files[0], 'UTF-8')
      fileReader.onload = e => {
        const importLayout = JSON.parse(e.target?.result as string)
        dispatch(addNewLayout(importLayout))
        setIsOpen(false)
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-2 flex items-center justify-center w-full gap-1">
          <FileUp className="size-4 shrink-0 text-black" />
          <span className="text-sm text-black">Import</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import your JSON file</DialogTitle>
        </DialogHeader>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="json_file">Your file</Label>
          <Input id="json_file" type="file" onChange={handleChangeFile} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ImportButton
