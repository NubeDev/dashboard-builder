import { useState } from 'react'

import styled from 'styled-components'

import { Nav } from 'src/components/Nav'
import { Textarea } from 'src/shadcn/components/ui/textarea'
import { ElementModel } from 'src/libs/models'
import { Card, CardContent } from 'src/shadcn/components/ui/card'
import { LIST_CORE_ELEMENTS } from 'src/config'
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'src/shadcn/components/ui/tabs'

interface AddElementExpandingProps {
  isExpanded: boolean
  onAddElement: (element: ElementModel) => void
  closeExpandingSection: () => void
}

const Container = styled.div`
  position: absolute;
  left: 100px;
  top: 0;
  width: 450px;
  height: 100%;
  color: #ffffff;
  padding: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 100;
`

const ImportButton = styled.button`
  width: 100%;
  padding: 8px;
  margin-bottom: 8px;
  background-color: #3182ce;
  color: #ffffff;
  font-weight: bold;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    background-color: #2b6cb0;
  }
`

const AddElementExpandingSection: React.FC<AddElementExpandingProps> = ({ onAddElement, isExpanded }) => {
  const [htmlCode, setHtmlCode] = useState('')

  // const handleAddHtml = () => {
  //   onAddElement({ type: 'Custom', code: <div dangerouslySetInnerHTML={{ __html: htmlCode }} /> })
  //   setHtmlCode('')
  // }

  const handleComponentClick = (element: ElementModel) => {
    onAddElement(element)
  }

  return (
    <Container
      style={{
        transform: `translateX(${isExpanded ? '0' : '-100%'})`
      }}
      className="duration-500 ease-in-out bg-current"
    >
      <Tabs defaultValue="core" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="core">Core</TabsTrigger>
          <TabsTrigger value="import">Import</TabsTrigger>
        </TabsList>
        <TabsContent value="core">
          <Card className="px-2 py-4">
            <div className="text-sm font-bold">Header</div>
            <Nav
              listBlock={LIST_CORE_ELEMENTS.filter(l => l.position === 'header')}
              onClickBlock={handleComponentClick}
            />
            <div className="text-sm font-bold">Body</div>
            <Nav listBlock={LIST_CORE_ELEMENTS.filter(l => !l.position)} onClickBlock={handleComponentClick} />
            <div className="text-sm font-bold">Footer</div>
            <Nav
              listBlock={LIST_CORE_ELEMENTS.filter(l => l.position === 'footer')}
              onClickBlock={handleComponentClick}
            />
          </Card>
        </TabsContent>
        <TabsContent value="import">
          <Card>
            <CardContent className="space-y-2 p-4 pt-2">
              <div>
                <span>
                  Use HTML snippets from Tailwind CSS component libraries etc. or just copy paste your own HTML code.
                </span>
                <Textarea
                  value={htmlCode}
                  onChange={e => setHtmlCode(e.target.value)}
                  rows={8}
                  placeholder="Enter your code snippet here..."
                  className="mt-6 mb-4"
                />
                <ImportButton>Import</ImportButton>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Container>
  )
}

export default AddElementExpandingSection
