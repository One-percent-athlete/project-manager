import React, { FC } from 'react'
import { MdCancel } from "react-icons/md"

type Props = {
    isVisible: boolean
    toggleAddBoardForm: () => void
}

const AddBoardForm: FC<Props> = props => {
    const { isVisible, toggleAddBoardForm } = props

  return <div className={`absolute w-80 z-[55] bg-gray-200 rounded-lg shadow ${isVisible ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-700" : "-translate-y-[150%] left-1/2 -translate-x-1/2"}`}>
    <button type="button" className="absolute top-3 right-2.5 text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center bg-gray-600">
        <MdCancel onClick={toggleAddBoardForm} className="text-3xl" />
    </button>

    <div className="px-6 py-6 lg:px-8">
        <h3 className="mb-4 text-xl font-medium">Add Project Board</h3>
    </div>
    </div>
}

export default AddBoardForm