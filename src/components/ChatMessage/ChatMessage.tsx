import React, { FC } from 'react'

type Props {
    text: string
    role: "user" | "assistant"
    userImage: string
}

const ChatMessage: FC<Props> = (props) => {
    const { role, text, userImage } = props

  return <>
     {role === "user" && <div className="bg-white p-4 rounded-lg flex gap-4 items-center whitespace-pre-wrap">

    </div> }
  </>
}

export default ChatMessage