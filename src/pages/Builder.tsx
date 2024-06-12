import styled from 'styled-components'

import MiddleSidebar from 'src/components/builder/MiddleSidebar'
import RightContent from 'src/components/builder/RightContent'
import LeftSidebar from 'src/components/builder/leftSidebar/LeftSidebar'
import Layout from 'src/components/layout/Layout'

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`

const Builder: React.FC = () => {
  return (
    <Layout>
      <Container>
        <LeftSidebar />
        <MiddleSidebar />
        <RightContent />
      </Container>
    </Layout>
  )
}

export default Builder
