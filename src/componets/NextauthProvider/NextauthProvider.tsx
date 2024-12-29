"use client"

import { SessionProvider } from "next-auth/react"

type Props = {
    children: React.ReactNode
}

export const NextAuthProv = ({children}: Props) => {
    <SessionProvider>{children}</SessionProvider>
}