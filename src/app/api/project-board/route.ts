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
    const {} = await req.json()
}