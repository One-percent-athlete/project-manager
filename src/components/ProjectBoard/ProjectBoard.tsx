"use client"

import { Dispatch, FC, SetStateAction } from "react"

type Props = {
    boardHeading: string
    toggleAddFeature: () => void
    setSelectBoardId: Dispatch<SetStateAction<string>>
    boardId: string
    numFeature: number
}

const ProjectBoard: FC<Props> = props => {
  return (
    <div>ProjectBoard</div>
  )
}

export default ProjectBoard