import { FC } from "react"
import { MdCancel } from "react-icons/md"

interface ProjectFormProps {
    isVisible: boolean
}

const ProjectForm: FC<ProjectFormProps> = props => {
    const { isVisible } = props

    return <div className={`absolute w-80 z-[55] bg-white rounded-lg shadow ${isVisible ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-700" : "-translate-y-[150%] left-1/2 -translate-x-1/2"}`}>
        <button type='button' className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200  hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center">
            <MdCancel className="text-3xl" />
        </button>
    </div>
}

export default ProjectForm