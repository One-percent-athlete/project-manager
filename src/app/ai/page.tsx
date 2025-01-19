"use client"

import Input from "@/components/Input/Input"
import axios from "axios"
import React, { useEffect, useState } from 'react'

const Ai = () => {
    const [chat, setChat] = useState<{
        role: "user" | "assistant"
        content: string
        id: string
        userId: string
    }[]>([])

    useEffect(() => {
        const fetchUserMessages = async () => {
            const { data } = await axios.get("/api/ai/")
            
            setChat(data.aiChat)
        }

        fetchUserMessages()
    }, [])

    return (
        <div>
            <form className="sticky top-0" onSubmit={() => {}}>
                <Input type="text" label="Prompt AI" name="prompt" onChange={() => {}} placeholder="Type your prompt" value="" required disabled />
            </form>
        </div>
  )
}

export default Ai