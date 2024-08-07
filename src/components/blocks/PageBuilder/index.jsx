import React, { useEffect } from 'react'

import WrapperApp from 'pageBuilder/WrapperApp'
import useSharedImage from 'pageBuilder/useSharedImage'

const PageBuilder = props => {
  const [sharedImageJSON, setSharedImageJSON] = useSharedImage()

  useEffect(() => {
    if (sharedImageJSON) {
      const sharedImage = JSON.parse(sharedImageJSON)

      props.handleSaveImage(sharedImage)
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

export default PageBuilder
