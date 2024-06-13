import { useSelector, useDispatch } from 'react-redux'

import styled from 'styled-components'

import { RootState } from 'src/store/store'
import { resetCurrentEditComponent } from 'src/store/current-edit-component'

import Layout from 'src/components/layout'
import LeftSidebar from 'src/components/builder/LeftSidebar'
import RightContent from 'src/components/builder/RightContent'
import MiddleSidebar from 'src/components/builder/MiddleSidebar'
import ComponentEditSheet from 'src/components/common/ComponentEditSheet'

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`

const Builder: React.FC = () => {
  const dispatch = useDispatch()
  const currentEditComponent = useSelector((state: RootState) => state.currentEditComponent.currentEditComponent)

  // functions
  const handleChangeSheet = () => {
    dispatch(resetCurrentEditComponent())
  }

  return (
    <Layout>
      <Container>
        <LeftSidebar />
        <MiddleSidebar />
        <RightContent />
      </Container>

      <ComponentEditSheet
        isShowSheet={!!currentEditComponent}
        onChange={handleChangeSheet}
        currentComponent={currentEditComponent}
      />
    </Layout>
  )
}

export default Builder
