import Head from "next/head"
import React from "react"

type Props = {
    children: React.ReactNode;
}

export const Page: React.FC<Props> = ({ children }) => {
    return (
        <>
            <Head>
                <title>Quandry</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex min-h-screen justify-center items-center flex-col bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
                { children }
            </main>
        </> 
    )
}