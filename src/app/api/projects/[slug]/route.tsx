import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params}: any) {
    try {
        const project = await prisma.project.findUnique({
            where: {slug: params.slug}
        })
    } catch (error) {
        return new NextResponse("Cannot fetch data", {status: 500})
    }
}