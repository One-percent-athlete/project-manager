"use client"

import AddBoardForm from "@/components/AddBoardForm/AddBoardForm"
import Modal from "@/components/Modal/Modal"
import { Project } from "@/models/projects"
import axios from "axios"
import { useParams } from "next/navigation"
import React, { ChangeEventHandler, FormEvent, useEffect, useState } from 'react'
import { AiFillPlusCircle } from "react-icons/ai"

const ProjectItem = () => {
    const [project, setProject] = useState<null | Project>(null)
    const [isAddBoardFormVisible, setIsAddBoardFormVisible ] = useState(false)
    const [isSubmitting, setIsSubmitting ] = useState(false)
    const [boardData, setBoardData] = useState({status: ""})

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
    }

    return (
    <>
        <Modal isVisible={isAddBoardFormVisible} />
        <AddBoardForm isVisible={isAddBoardFormVisible} toggleAddBoardForm={toggleAddBoardForm} boardData={boardData} handleBoardSubmit={handleBoardSubmit} isSubmitting={isSubmitting} updateBoardHandler={updateBoardHandler} />
        <div className="mb-6">
            <h4 className="text-2xl font-bold">{project?.name}</h4> 
            <p className="text-base text-gray-600">{project?.description}</p> 
        </div>

        <div className="grid place-content-center hover:bg-[#f5f5f5] cursor-pointer rounded-2xl border-4 border-dotted flex-none w-[354px] h-20 py-7">
            <AiFillPlusCircle className="text-6xl" />
        </div>
    </>)
}
export default ProjectItem