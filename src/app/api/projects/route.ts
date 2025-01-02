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
        const products = await prisma.project.findMany()

        return NextResponse.json(products, {
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
}