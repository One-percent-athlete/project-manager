import { Feature } from "@/models/projects"
import React, { FC } from 'react'

type Props = {
    feature: Feature
}

const FeatureCard: FC<Props> = (props) => {
    const { feature: {name, description, priority, finishDate} } = props

  return (
    <div className="my-5 bg-white p-5 rounded-2xl">
        <span className="bg-[#dfa87433] text-[#D58D49] rounded-[4px] px-[6px] py-1 font-medium text-xs">
            {priority}
        </span>
    </div>
  )
}

export default FeatureCard