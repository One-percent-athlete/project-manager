"use client"

import AddBoardForm from "@/components/AddBoardForm/AddBoardForm"
import AddFeatureForm from "@/components/AddFeatureForm/AddFeatureForm"
import Modal from "@/components/Modal/Modal"
import ProjectBoard from "@/components/ProjectBoard/ProjectBoard"
import { Project } from "@/models/projects"
import axios from "axios"
import { useParams } from "next/navigation"
import React, { ChangeEventHandler, FormEvent, useEffect, useState } from 'react'
import toast from "react-hot-toast"
import { AiFillPlusCircle } from "react-icons/ai"

const ProjectItem = () => {
    const [project, setProject] = useState<null | Project>(null)
    const [isAddBoardFormVisible, setIsAddBoardFormVisible ] = useState(false)
    const [isSubmitting, setIsSubmitting ] = useState(false)
    const [boardData, setBoardData] = useState({status: ""})
    const [selectBoardId, setSelectBoardId] = useState("")

    const { slug } = useParams()

    useEffect(() => {
        const fetchProject = async () => {
            const { data } = await axios.get(`/api/projects/${slug}`)
        }

        fetchProject()
    }, [slug])

    if (!project) return <></>
    const toggleAddBoardForm = () => setIsAddBoardFormVisible(prevState => !prevState)

    const updateBoardHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
        const { name, value } =event.target

        setBoardData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleBoardSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsSubmitting(true)

        const slug = slugify(boardData.status)

        try {
            const { statusText } = await axios.post("/api/project-board", {status: boardData.status, projectId: project.id, slug})

            toast.success(statusText)
        } catch (error: any) {
            toast.error(error.response.data)
        } finally {
            setBoardData({ status: ""})
            setIsSubmitting(false)
            setIsAddBoardFormVisible(false)
        }
    }

    return (
    <>
        <Modal isVisible={isAddBoardFormVisible} />

        <AddFeatureForm />

        <AddBoardForm isVisible={isAddBoardFormVisible} toggleAddBoardForm={toggleAddBoardForm} boardData={boardData} handleBoardSubmit={handleBoardSubmit} isSubmitting={isSubmitting} updateBoardHandler={updateBoardHandler} />
        <div className="mb-6">
            <h4 className="text-2xl font-bold">{project?.name}</h4> 
            <p className="text-base text-gray-600">{project?.description}</p> 
        </div>

        <div className="flex gap-6 items-start">
            <div className="bg-[#f5f5f5] flex-shrink-0 w-[354px] rounded-2xl py-3 px-6">
                {project.projectBoards.map(projectBoard => (
                    <ProjectBoard key={projectBoard.id} boardHeading={projectBoard.status} boardId={projectBoard.id} numFeatures={projectBoard.feature.length} setSelectBoardId={setSelectBoardId} toggleAddFeature={() => {}} />
                ))}
            </div>

            <div onClick={toggleAddBoardForm} className="grid place-content-center hover:bg-[#f5f5f5] cursor-pointer rounded-2xl border-4 border-dotted flex-none w-[354px] h-20 py-7">
                <AiFillPlusCircle className="text-6xl" />
            </div>
        </div>

    </>)
}
export default ProjectItem

function slugify(status: string) {
    throw new Error("Function not implemented.")
}
