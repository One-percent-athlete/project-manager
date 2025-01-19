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
            const { data } = await axios.get("/api/ai")
            console.log(data);
            
            setChat(data.aiChat)
        }
    }, [])

    return (
    <div>Ai</div>
  )
}

export default Ai