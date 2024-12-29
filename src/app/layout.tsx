import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/componets/Sidebar/Sidebar"
import Header from "@/componets/Header/Header";
import { NextAuthProvider } from "@/componets/NextauthProvider/NextauthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Project Manager",
  description: "Manage Your Project Smart",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          {""}
          <main className="ml-64 py-20 px-6">
            <Sidebar />
            <Header />
            {children}
          </main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
