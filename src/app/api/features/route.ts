import { NextResponse } from "next/server";

export async function POST(req:Request, res:Response) {
    try {
        
    } catch (error) {
        console.log(error);
        return new NextResponse("Creation Error", {status: 500})
    }
}