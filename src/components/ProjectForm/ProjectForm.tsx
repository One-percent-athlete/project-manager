import { FC } from "react"

interface ProjectFormProps {
    isVisible: boolean
}

const ProjectForm: FC<ProjectFormProps> = props => {
    const { isVisible } = props

    return <div className={`absolute w-80 z-[55] bg-white rounded-lg shadow ${isVisible ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-700" : "-translate-y-[150%] left-1/2 -translate-x-1/2"}`}></div>
}

export default ProjectForm