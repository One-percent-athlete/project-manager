import { authOptions } from "@/libs/auth"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import OpenAi from "openai"

const openai = new OpenAi({apiKey: process.env.OPEN_API_KEY})

export async function POST(req: Request, res: Response) {
    const session = await getServerSession(authOptions)
    
    const {prompt, role} = await req.json()

    if (!prompt || !role) return new NextResponse("Please provide a prompt", {status: 400})
    const chatCompletion = await 
}