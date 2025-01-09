import React, { FC, FormEvent } from 'react'

type Props = {
    isVisible: boolean
    toggleAddFeatureForm: () => void
    handleFeatureSubmit: (event:FormEvent<HTMLFormElement>) => Promise<void>
}

const AddFeatureForm: FC<Props> = (props) => {

  return (
    <div>AddFeatureForm</div>
  )
}

export default AddFeatureForm