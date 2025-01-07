import React, { FC } from 'react'

type Props = {
    isVisible: boolean
}

const AddBoardForm: FC<Props> = props => {
    const { isVisible } = props

  return <div className={`absolute w-80 z-[55] bg-gray-200 rounded-lg shadow ${isVisible ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-700" : "-translate-y-[150%] left-1/2 -translate-x-1/2"}`}>AddBoardForm</div>
}

export default AddBoardForm