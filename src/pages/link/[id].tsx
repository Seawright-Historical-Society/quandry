import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Input } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Header } from "~/components/typography";
import { api } from "~/utils/api";

export default function Edit() {
    const {data: session} = useSession();
    const router = useRouter();
    const id: string = router.query.id?.toString() ?? "";

    const initialQuery = api.url.isValid.useQuery({ id });
    const query = api.url.get.useQuery({ id });

    const mutation = api.url.update.useMutation();

    const [path, setPath] = useState(query.data?.path ?? "");
    const [alias, setAlias] = useState(query.data?.alias ?? "");
    const [password, setPassword] = useState(query.data?.password ?? "");
    const [hint, setHint] = useState(query.data?.hint ?? "");

    useEffect(() => {
        setPath(query.data?.path ?? "")
        setAlias(query.data?.alias ?? "")
        setPassword(query.data?.password ?? "")
        setHint(query.data?.hint ?? "")
    }, [query.data?.path, query.data?.alias, query.data?.password, query.data?.hint]);

    const updateCard = async () => {
        const url = {
            path, alias, password, hint
        }
        console.log(url);
        mutation.mutate({ id, ...url });
    }

    return (
        initialQuery.data?.success ?
        <>
            <Card className="w-96" isBlurred>
                <CardHeader>Edit URL</CardHeader>
                <Divider />
                <CardBody>
                    <div className="px-3">
                        <Input className="px-3 py-3" type="text" label="URL to Encode" value={path} onChange={e => setPath(e.target.value)} variant="bordered" placeholder="https://google.com" isClearable/>
                        <Input className="px-3 py-3" type="text" label="Alias or Label" value={alias} onChange={e => setAlias(e.target.value)} variant="bordered" placeholder="My Super Secret Link for Valentines Day" isClearable/>
                        <Input className="px-3 py-3" type="text" label="Password" value={password} onChange={e => setPassword(e.target.value)} variant="bordered" placeholder="SuperSecretPassword123" isClearable/>
                        <Input className="px-3 py-3" type="text" label="Hint" value={hint} onChange={e => setHint(e.target.value)} variant="bordered" placeholder="Cyber Security Expert..." isClearable/>
                    </div>
                    <Button color={mutation.isSuccess ? "success" : "primary" } className="my-3 mx-6" onClick={updateCard}> {mutation.isSuccess ? "Updated Successfully!" : "Update" } </Button>
                </CardBody>
                <Divider />
                <CardFooter>
                { mutation.error && <p className="text-red-700"> { mutation.error.message } </p>}
                </CardFooter>
            </Card>
        </> : <>
            <Header>Invalid URL</Header>
        </>
    )
}