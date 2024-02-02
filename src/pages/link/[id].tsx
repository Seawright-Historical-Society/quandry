import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Header } from "~/components/typography";

export default function Edit() {
    const {data: session} = useSession();
    const router = useRouter();
    const id: string = router.query.id?.toString() ?? "";

    return (
        <>
            <Header>Edit URL</Header>
        </>
    )
}