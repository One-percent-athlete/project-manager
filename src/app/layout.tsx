import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar/Sidebar"
import Header from "@/components/Header/Header";
import { NextauthProvider } from "@/components/NextauthProvider/NextauthProvider";
import Toast from "@/components/ProjectForm/Toast/Toast";

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
        <NextauthProvider>
          <main className="ml-64 py-20 px-6">
            <Toast />
            <Sidebar />
            <Header />
            {children}
          </main>
        </NextauthProvider>
      </body>
    </html>
  );
}
