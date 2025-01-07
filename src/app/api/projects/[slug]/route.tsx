import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import { features } from "process";

export async function GET(req: Request, { params}: any) {
    try {
        const project = await prisma.project.findUnique({
            where: {slug: params.slug},
            include: {
                projectBoards: {
                    include: {
                        features: true
                    }
                }
            }
        })

        return NextResponse.json(project, {status: 200, statusText: "Successful"})
    } catch (error) {
        return new NextResponse("Cannot fetch data", {status: 500})
    }
}