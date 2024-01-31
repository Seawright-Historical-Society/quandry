import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Header } from "~/components/typography";
import { api } from "~/utils/api";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider } from "@nextui-org/react";
import Link from "next/link";

export default function Dashboard() {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        // Are we authenticated? 
        if (!session) void router.push("/auth/login")
    }, []);


    // Get all the user's URLS
    const urls = api.url.getAll.useQuery();

    return (
        <>
            <Header>Dashboard</Header>
            <div className="flex flex-col m-3 p-3">
                {urls.data?.map(url => (
                    <div key={url.id} className="flex flex-col p-3">
                        <Card>
                            <CardHeader>
                                <p className="font-bold px-3">{url.alias}</p> 
                            </CardHeader>
                            <Divider />
                            <CardBody>
                                <p className="px-3"><Link href={url.path}><span className="text-blue-400"> { url.path }</span></Link> - <span className="italic"> Hint: {url.hint} </span></p>
                            </CardBody>
                            <Divider />
                            <CardFooter>
                                <div className="px-3">
                                    <Button className="mr-3" color="primary">Edit</Button>
                                    <Button className="mr-3" color="danger">Delete</Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                ))}
            </div>
        </>
    )
}