"use client"

import AddBoardForm from "@/components/AddBoardForm/AddBoardForm"
import AddFeatureForm from "@/components/AddFeatureForm/AddFeatureForm"
import FeatureCard from "@/components/FeatureCard/FeatureCard"
import Modal from "@/components/Modal/Modal"
import ProjectBoard from "@/components/ProjectBoard/ProjectBoard"
import { Project } from "@/models/projects"
import axios from "axios"
import { useParams } from "next/navigation"
import React, { ChangeEvent, ChangeEventHandler, FormEvent, useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd"
import toast from "react-hot-toast"

const ProjectItem = () => {
    const [project, setProject] = useState<null | Project>(null)
    const [isAddBoardFormVisible, setIsAddBoardFormVisible ] = useState(false)
    const [isSubmitting, setIsSubmitting ] = useState(false)
    const [isAddFeatureFormVisible, setIsAddFeatureFormVisible ] = useState(false)
    const [boardData, setBoardData] = useState({status: ""})
    const [selectBoardId, setSelectBoardId] = useState("")
    const [featureFormData, setFeatureFormData] = useState({name: "", description: "", finishDate:""})

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

    const handleFeatureChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target

        setFeatureFormData(prevData => ({
            ...prevData,
            [name]:value
        }))
    }

    const handleFeatureSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const slug = slugify(featureFormData.name.toLowerCase())

        try {
            const {statusText} = await axios.post("/api/features", {
                ...featureFormData,
                slug,
                projectBoardId: selectBoardId
            })

            toast.success(statusText)
        } catch (error: any) {
            toast.error(error.response.data)
        } finally {
            setFeatureFormData({ name: "", description: "", finishDate: ""})
            setIsAddFeatureFormVisible(false)
        } 
    }

    const toggleAddFeatureForm = () => setIsAddFeatureFormVisible(prevState => !prevState)

    const onDragEnd = async (result: DropResult) => {
        const { source, destination, type } = result
        if (!destination) return
        if (type === "status") {
            const movedBoard = project.projectBoards[source.index]
            const updatedProjectBoards = Array.from(project.projectBoards)

            updatedProjectBoards.splice(source.index, 1)
            updatedProjectBoards.splice(destination.index, 0, movedBoard)

            setProject({
                ...project,
                projectBoards: updatedProjectBoards.map((board, index: number) => ({
                    ...board,
                    order: index + 1,

                }))
            })

            try {
                const { statusText } = await axios.patch("/api/project-board", {
                    projectId: project.id,
                    sourceIndex: source.index,
                    destinationIndex: destination.index,
                    type,
                })

                toast.success(statusText)
            } catch (error) {
                setProject({
                    ...project,
                    projectBoards: project.projectBoards,

                })
                toast.error("Update not successful")
            }
        } else if ( type === "feature" ) {
            const { index: sourceIndex, droppableId: sourceBoardId } = source
            const destinationBoardId = destination.droppableId

            const updatedProjectBoards = project.projectBoards.map(board => {
                if(board.id === sourceBoardId) {
                    const movedFeature = board.feature.splice(sourceIndex, 1)[0]

                    const destinationBoard = project.projectBoards.find(board => board.id === destinationBoardId)

                    // if (!destinationBoard) return 

                    destinationBoard!.feature.splice(destination.index, 0, movedFeature)

                    return board
                } else if (board.id === destinationBoardId) {
                    return board
                } else {
                    return board 
                }
            })

            const updatedProject = {
                ...project,
                projectBoards: updatedProjectBoards,
            }
            setProject(updatedProject)

            try {
                const { statusText } = await axios.patch("/api/project-board", {
                    type: "feature",
                    projectId: project.id,
                    sourceIndex,
                    destinationIndex: destination.index,
                    sourceBoardId,
                    destinationBoardId
                })

                toast.success(statusText)
            } catch (error) {
                toast.error("Update failed")
            }
        }
    }

    return (
        <>
            <Modal isVisible={isAddBoardFormVisible || isAddFeatureFormVisible } />

            <AddFeatureForm featureFormData={featureFormData} handleFeatureChange={handleFeatureChange} handleFeatureSubmit={handleFeatureSubmit} isVisible={isAddFeatureFormVisible} toggleAddFeatureForm={toggleAddFeatureForm} />

            <AddBoardForm isVisible={isAddBoardFormVisible} toggleAddBoardForm={toggleAddBoardForm} boardData={boardData} handleBoardSubmit={handleBoardSubmit} isSubmitting={isSubmitting} updateBoardHandler={updateBoardHandler} />
            <div className="mb-6">
                <h4 className="text-2xl font-bold">{project?.name}</h4> 
                <p className="text-base text-gray-600">{project?.description}</p> 
            </div>

            <DragDropContext onDragEnd={onDragEnd} >
                <Droppable droppableId="board-itmes" direction="horizontal" type="status">
                    {provided => (
                        <div className="flex gap-6 items-start" {...provided.droppableProps} ref={provided.innerRef}>
                            {project.projectBoards.sort((a: any, b: any) => (a.order - b.order)).map((projectBoard, index) => (
                                <Draggable index={index} draggableId={projectBoard.id} key={projectBoard.id}>
                                    { provided => (
                                        <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} className="bg-[#f5f5f5] flex-shrink-0 w-[354px] rounded-2xl py-3 px-6">
                                        <ProjectBoard boardHeading={projectBoard.status} boardId={projectBoard.id} numFeatures={projectBoard.feature.length} setSelectBoardId={setSelectBoardId} toggleAddFeature={toggleAddFeatureForm} />
                                        
                                        <Droppable droppableId={projectBoard.id} type="project">
                                            { provided => (
                                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                                    {projectBoard.feature.map((feature, index) => (
                                                        <Draggable key={feature.id} draggableId={feature.id} index={index}>
                                                            { provided => (
                                                                <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                                                                    <FeatureCard key={feature.id} feature={feature} />
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable>
                                    </div>
                                    )}
                                </Draggable>
                                ))}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    )
}
export default ProjectItem

function slugify(status: string) {
    throw new Error("Function not implemented.")
}
