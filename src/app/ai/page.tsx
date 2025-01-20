"use client"

import ChatMessage from "@/components/ChatMessage/ChatMessage"
import Input from "@/components/Input/Input"
import axios from "axios"
import React, { FormEvent, useEffect, useState } from 'react'

const Ai = () => {
    const [chat, setChat] = useState<{
        role: "user" | "assistant"
        content: string
        id: string
        userId: string
    }[]>([])

    const [userImage, setUserImage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchUserMessages = async () => {
            const { data } = await axios.get("/api/ai/")
            
            setChat(data.aiChat)
        }

        fetchUserMessages()
    }, [])

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)

        try {
            
        } catch (error) {
            
        }
    }

    return (
        <div>
            <form className="sticky top-0" onSubmit={handleSubmit}>
                <Input type="text" label="Prompt AI" name="prompt" onChange={() => {}} placeholder="Type your prompt" value="" required disabled />
            </form>

            <div className="mt-10">
                {chat.map(chatMsg => (
                    <ChatMessage key={chatMsg.id} role={chatMsg.role} text={chatMsg.content} userImage="" />
                ))}
            </div>
        </div>
  )
}

export default Ai