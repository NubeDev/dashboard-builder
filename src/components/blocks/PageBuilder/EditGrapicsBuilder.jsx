import React, { useEffect } from 'react'

import WrapperApp from 'pageBuilder/WrapperApp'
import useEditImageId from 'pageBuilder/useEditImageId'
import useSharedImage from 'pageBuilder/useSharedImage'

const EditGrapicsBuilder = props => {
  const [, setEditImageId] = useEditImageId()
  const [sharedImageJSON, setSharedImageJSON] = useSharedImage()

  useEffect(() => {
    if (props?.grapicsBuilder?.pageBuilderId) {
      setEditImageId(props?.grapicsBuilder?.pageBuilderId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props?.grapicsBuilder])

  useEffect(() => {
    if (sharedImageJSON) {
      const sharedImage = JSON.parse(sharedImageJSON)

      props.onSaveEditImage(sharedImage, props?.grapicsBuilder?.id)
      props.onClose()
      setSharedImageJSON('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sharedImageJSON])

  return (
    <React.Fragment>
      <WrapperApp />
    </React.Fragment>
  )
}

export default EditGrapicsBuilder
