import prisma from "@/libs/prisma"
import { connect } from "http2"
import { NextResponse } from "next/server"

export async function POST(req: Request, res:Response) {
    const {status, projectId, slug} = await req.json()

    if (!status || !projectId || !slug) 
        return new NextResponse("All fields are required", {status: 400})

    try {
        const maxOrderResult = await prisma.projectBoard.aggregate({
            _max: {
                order: true
            },
            where: {
                projectId
            }
        })

        const nextOrder = maxOrderResult._max?.order ? maxOrderResult._max.order + 1 : 1

        const createProjectBoard = await prisma.projectBoard.create({
            data: {
                slug,
                status,
                project: {
                    connect: {id: projectId}
                },
                order: nextOrder
            }
        })

        return NextResponse.json(createProjectBoard, {
            status: 200, statusText: "Project board created."
        })
    } catch (error) {
        return new NextResponse("Creation Error", {status: 500})
    }
}

export async function PATCH(req: Request, res: Response) {
    const { projectId, sourceIndex, destinationIndex, type, sourceBoardId, destinationBoardId } = await req.json()

    try {
        if (type === "status") {
            const projectBoards = await prisma.projectBoard.findMany({
                where: { projectId },
                orderBy: { order: "asc" },

            })

            const sourceBoard = projectBoards[sourceIndex]
            const destinationBoard = projectBoards[destinationIndex]

            await prisma.projectBoard.update({
                where: {
                    id: sourceBoard.id
                },
                data: {
                    order: destinationBoard.order
                }
            })

            await prisma.projectBoard.update({
                where: {
                    id: destinationBoard.id
                },
                data: {
                    order: sourceBoard.order
                }
            })

            return NextResponse.json("Update successful", { status: 200, statusText: "Successful" })
        }

        if ( type === "feature") {
            const project = await prisma.project.findUnique({
                where: {
                    id: projectId,
                },
                include: { projectBoards: { include: { features: true}}}
            }
            )
            if (!project) return new NextResponse("Project not found", { status: 500})

            const sourceBoard = project.projectBoards.find(board => board.id === sourceBoardId)

            const destinationBoard = project.projectBoards.find(board => board.id === destinationBoardId)

            if(!sourceBoard || !destinationBoard) return new NextResponse("Error Updating", { status: 500 })

            const movedFeature = sourceBoard.features[sourceIndex]

            if (sourceBoardId === destinationBoardId) {
                const sourceFeatures = [...sourceBoard.features]
                const movedFeature = sourceFeatures.splice(sourceIndex, 1)[0]

                const destinationOrder = sourceFeatures[destinationIndex].order || destinationIndex + 
                
                movedFeature.order = destinationOrder

                sourceFeatures.forEach((feature, index) => {
                    if ( index >= Math.min(sourceIndex, destinationIndex) && index <= Math.max(sourceIndex, destinationIndex)) {
                        
                    }
                })
            }
        }
    } catch (error) {
        console.log(error);
        return new NextResponse("Error Updating", { status: 500 })
    }
}