import React, { useEffect } from 'react'

import WrapperApp from 'pageBuilder/WrapperApp'
import useSharedImage from 'pageBuilder/useSharedImage'

const PageBuilder = props => {
  const [sharedImage, setSharedImage] = useSharedImage()

  useEffect(() => {
    if (sharedImage) {
      props.handleSaveImage(sharedImage)
      setSharedImage('')
    }
  }, [sharedImage])

  return (
    <React.Fragment>
      <WrapperApp />
    </React.Fragment>
  )
}

export default PageBuilder
