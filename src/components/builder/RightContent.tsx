import { useSelector } from 'react-redux'

import styled from 'styled-components'

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

  return (
    <Container>
      <Title className="shrink">Preview</Title>
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
