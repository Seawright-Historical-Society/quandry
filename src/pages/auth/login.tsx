import { Header } from "~/components/typography";
import {Button, ButtonGroup} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function Login() {
    const {data: session} = useSession();
    const router = useRouter();
    if(session) void router.push("/dashboard");

    return (
        <>
            <Header>Log In</Header>
            <Button color="primary" variant="flat" onClick={() => signIn()}>Log In With Discord</Button>
        </>
    )
}