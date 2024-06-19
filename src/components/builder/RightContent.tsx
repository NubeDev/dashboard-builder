import { useSelector } from 'react-redux'

import styled from 'styled-components'

import { Button } from '@/shadcn/components/button'
import { RootState } from 'src/store/store'

import DragDropSection from '../blocks/DragDropSection'

const Container = styled.div`
  flex: 1;
  background-color: #f9fafb;
  padding: 16px;
  margin-left: 400px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 16px;
`

const Placeholder = styled.div`
  color: #6b7280;
`

const RightContent = () => {
  // const
  const selectedComponents = useSelector((state: RootState) => state.elementsLayout.listElements)

  // functions
  const handleExportToJSON = async () => {
    console.log('export')
    const fileName = 'export'
    const json = JSON.stringify(selectedComponents, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const href = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = href
    link.download = fileName + '.json'
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    URL.revokeObjectURL(href)
  }

  return (
    <Container>
      <div className="flex justify-between">
        <Title className="shrink">Preview</Title>
        <Button onClick={handleExportToJSON}>Export</Button>
      </div>
      {(!selectedComponents || selectedComponents?.length === 0) && (
        <Placeholder>Select an element to view its details</Placeholder>
      )}
      <div className="space-y-4 mb-8">
        <DragDropSection listRows={selectedComponents.filter(s => s.position === 'header')} />
      </div>
      <div className="space-y-4 mb-8">
        <DragDropSection listRows={selectedComponents.filter(s => !s.position)} />
      </div>
      <div className="space-y-4 mb-8">
        <DragDropSection listRows={selectedComponents.filter(s => s.position === 'footer')} />
      </div>
    </Container>
  )
}

export default RightContent
