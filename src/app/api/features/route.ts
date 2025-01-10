import { NextResponse } from "next/server";

export async function POST(req:Request, res:Response) {

    const {name, description, finishDate, projectBoardId, slug} = await req.json()

    if (!name || !description || !finishDate || !projectBoardId || !slug) return new NextResponse("Please Provide All Infomation", {status: 400})

    try {
        
    } catch (error) {
        console.log(error);
        return new NextResponse("Creation Error", {status: 500})
    }
}