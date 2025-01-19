import { authOptions } from "@/libs/auth"
import prisma from "@/libs/prisma"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import OpenAi from "openai"

const openai = new OpenAi({apiKey: process.env.OPEN_API_KEY})

export async function POST(req: Request, res: Response) {
    const session = await getServerSession(authOptions)
    
    const {prompt, role} = await req.json()

    if (!prompt || !role) return new NextResponse("Please provide a prompt", {status: 400})
    const chatCompletion = await openai.chat.completion.create({
            message: [{ role, content: prompt
            }], 
            model: "gpt-3.5-turbo"
        })
    const chatMessage = [
        {content: prompt, role},
        chatCompletion.choices[0].message
    ]
    await Promise.all(chatMessage.map( async message => {
        const { role, content } = message

        await prisma.aiChat.create({
            data: {
                role,
                content,
                userId: session?.user?.id as string
            },

        })
    }))

    return NextResponse.json(chatCompletion, {
        status: 200,
        statusText: "AI Result"
    })
}
