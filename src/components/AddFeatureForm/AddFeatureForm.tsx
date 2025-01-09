import React, { ChangeEvent, FC, FormEvent } from 'react'

type Props = {
    isVisible: boolean
    toggleAddFeatureForm: () => void
    handleFeatureSubmit: (event:FormEvent<HTMLFormElement>) => Promise<void>
    handleFeatureChange: (event:ChangeEvent<HTMLInputElement>) => void
    featureFormData: {
        name: string
        description: string
        finishData: string
    }
}

const AddFeatureForm: FC<Props> = (props) => {

  return (
    <div>AddFeatureForm</div>
  )
}

export default AddFeatureForm