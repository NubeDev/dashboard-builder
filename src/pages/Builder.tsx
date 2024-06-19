import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '@/store/store'
import { resetCurrentEditComponent } from '@/store/current-edit-component'

import Layout from '@/components/layout'
import LeftSidebar from '@/components/builder/LeftSidebar'
import RightContent from '@/components/builder/RightContent'
import MiddleSidebar from '@/components/builder/MiddleSidebar'
import ComponentEditSheet from '@/components/common/ComponentEditSheet'

const Builder: React.FC = () => {
  const dispatch = useDispatch()
  const currentEditComponent = useSelector((state: RootState) => state.currentEditComponent.currentEditComponent)

  // functions
  const handleChangeSheet = () => {
    dispatch(resetCurrentEditComponent())
  }

  return (
    <Layout>
      <div className="flex h-screen w-full">
        <LeftSidebar />
        <MiddleSidebar />
        <RightContent />
      </div>

      <ComponentEditSheet
        isShowSheet={!!currentEditComponent}
        onChange={handleChangeSheet}
        currentComponent={currentEditComponent}
      />
    </Layout>
  )
}

export default Builder
