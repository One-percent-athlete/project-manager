"use client"

import { SessionProvider } from "next-auth/react"

type Props = {
    children: React.ReactNode
}

export const NextauthProvider = ({children}: Props) => {
    <SessionProvider>{children}</SessionProvider>
}