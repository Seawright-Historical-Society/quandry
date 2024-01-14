import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Header } from "~/components/typography";

export default function Dashboard() {
    const {data: session} = useSession();
    const router = useRouter();
    
    useEffect(() => {
        // Are we authenticated? 
        if(!session) void router.push("/auth/login")
    }, []);

    return (
        <>
            <Header>Dashboard</Header>
        </>
    )
}