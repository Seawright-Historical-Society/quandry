import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Header } from "~/components/typography";
import { api } from "~/utils/api";

export default function URL() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const id: string = router.query.id?.toString() ?? "";

    const auth = api.url.authenticate.useQuery({ id, password }, { enabled: false });
    const query = api.url.isValid.useQuery({ id });
    const hintQuery = api.url.getHint.useQuery({ id });

    const openLock = async () => {
        const data = (await auth.refetch()).data;
        if(data) window.location.assign(data?.path);
    }

    return (
        <div>
            {query.data?.success && <>
                <Header>Lock</Header>
                <Input className="w-96 py-3" type="text" label="Password" placeholder={`Hint: ${hintQuery.data?.toString()}`} value={password} onChange={e => setPassword(e.target.value)} />
                <Button color="primary" onClick={openLock}>Open the Lock...</Button>
            </>}
            {!query.data?.success && <>
                <Header>Empty Lock</Header>
                <p className="text-md"><span className="text-red-500">Nothing</span> to see here...</p> 
            </>}
        </div>
    )
}