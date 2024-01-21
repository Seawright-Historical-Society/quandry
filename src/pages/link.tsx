import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Input } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "~/components/typography";
import { api } from "~/utils/api";

export default function Link() {
    const {data: session} = useSession();
    const mutation = api.url.create.useMutation();

    // State
    const [path, setPath] = useState("");
    const [alias, setAlias] = useState("");
    const [password, setPassword] = useState("");
    const [hint, setHint] = useState("");

    const [shortenedURL, setShortenedURL] = useState("");

    const generateURL = (id: string | number) => `http://quandry.dearclarent.com/key/${id}`

    const createCard = async () => {
        console.log({ path, alias, password })
        mutation.mutate({ path, alias, password, hint });
        if(mutation?.data) {
            // Successful card creation
            const card = mutation.data;
            setShortenedURL(generateURL(card.id))
            console.log(card);
        }
    }


    return (
        <>
            <Card className="w-96" isBlurred>
                <CardHeader>
                    <Header>Encode a URL</Header>
                </CardHeader>
                <Divider />
                <CardBody>
                    <div className="px-3">
                        <Input className="px-3 py-3" type="text" label="URL to Encode" value={path} onChange={(e) => setPath(e.target.value)} variant="bordered" placeholder="https://google.com" isClearable />
                        <Input className="px-3 py-3" type="text" label="Alias or Label" value={alias} onChange={e => setAlias(e.target.value)} variant="bordered" placeholder="My Secret Link for Valentines Day" isClearable />
                        <Input className="px-3 py-3" type="text" label="Password" value={password} onChange={e => setPassword(e.target.value)} variant="bordered" placeholder="SuperSecretPassword123" isClearable />
                        <Input className="px-3 py-3" type="text" label="Hint" value={hint} onChange={e => setHint(e.target.value)} variant="bordered" placeholder="Cyber Security Expert..." isClearable />
                    </div>
                    <Button color="primary" className="my-3 mx-6" onClick={createCard}> Generate </Button>
                </CardBody>
                <CardFooter>
                    <div className="p-3 text-blue-700">
                        <Input className="px-3" type="text" value={shortenedURL} label="Shortened URL" variant="bordered" isReadOnly={true} />
                    </div>
                </CardFooter>
            </Card>
        </>
    )
}