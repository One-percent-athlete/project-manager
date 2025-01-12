import { Feature } from "@/models/projects"
import React, { FC } from 'react'

type Props = {
    feature: Feature
}

const FeatureCard: FC<Props> = (props) => {
    const { feature: {name, description, priority, finishDate} } = props

  return (
    <div>FeatureCard</div>
  )
}

export default FeatureCard