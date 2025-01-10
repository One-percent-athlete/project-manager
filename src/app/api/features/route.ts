import prisma from "@/libs/prisma";
import { parseISO } from "date-fns";
import { NextResponse } from "next/server";

export async function POST(req:Request, res:Response) {

    const {name, description, finishDate, projectBoardId, slug} = await req.json()

    if (!name || !description || !finishDate || !projectBoardId || !slug) return new NextResponse("Please Provide All Infomation", {status: 400})

    try {
        const projectBoard = await prisma.projectBoard.findUnique({
            where: { id: projectBoardId },
            include: {
                features: true
            }
        })

        if (!projectBoard) return new NextResponse("Feature must belong to a project board", {status: 400})
        
        const order = projectBoard.features.length + 1

        const feature = await prisma.feature.create({
            data: {
                name, 
                description,
                finishDate: parseISO(finishDate),
                order,
                slug,
                projectBoard: {
                    connect: { id: projectBoardId }
                }
            }
        })

        return NextResponse.json(feature, {
            status: 200,
            statusText: "Feature Created Successfully."
        })
    } catch (error) {
        console.log(error);
        return new NextResponse("Creation Error", {status: 500})
    }
}