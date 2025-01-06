import { authOptions } from "@/libs/auth";
import prisma from "@/libs/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
    const session = await getServerSession(authOptions)

    if(!session){
        return new NextResponse("Not Authenticated", {status: 500})
    }

    try {
        const projects = await prisma.project.findMany()

        return NextResponse.json(projects, {
            status: 200,
            statusText: "Successful"
        })
    } catch (error) {
        console.log(error);
        return new NextResponse("Cannot fetch data", {status: 500})
    }
}

export async function POST(req: Request, res: Response) {
    const session = await getServerSession(authOptions)

    if(!session){
        return new NextResponse("Not Authenticated", {status: 500})
    }

    const userEmail = session.user?.email

    const userId = session.user?.id 

    const { description, name, slug } = await req.json()

    if(!description || !name || !slug) {
        return new NextResponse("All fields are required", {status: 400}) 
    }

    try {
        const createProject = await prisma.project.create({
            data: {
                description,
                name,
                slug,
                userId
            }
        })
        return NextResponse.json(createProject, {
            status: 200,
            statusText: "Project Created Successfully"
        })
    } catch (error) {
        console.log(error);
        return new NextResponse("Creation error, please try again", {status: 500}) 
    }
}

export async function PATCH(req: Request, res: Response) {
    const {name, description, id, slug} = await req.json()

    if (!name || !description || !id || !slug) {
        return new NextResponse("All fields are required.", { status: 400 })
    } 

    try {
        const updatedProject = await prisma.project.update({
            where: { id },
            data: { name, description, slug }
        })

        return NextResponse.json(updatedProject, { status: 200, statusText: "Successful" })
    } catch (error) {
        console.log(error);
        return new NextResponse("Error updating, please try again", { status: 500 })
    }
}