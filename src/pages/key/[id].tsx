import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image"
import { Header, HistoricHeader } from "~/components/typography";
import accessRestricted from "public/access_restricted.png"
import { api } from "~/utils/api";
import { Courier_Prime } from "next/font/google"

const CourierPrime = Courier_Prime({
    subsets: ['latin'],
    weight: "400",
    variable: '--font-courier'
});


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
        <div className={`flex flex-col justify-evenly items-center p-3 h-screen w-screen font-mono ${CourierPrime.variable}`}>
            {query.data?.success && <>
                <HistoricHeader>Access restricted. Please enter the passcode to continue. </HistoricHeader>
                <Image src={accessRestricted} alt={"Access Restrictred"} height={500} width={500}/>
                <p>Hint: {hintQuery.data?.toString()}</p>
                <input className="p-3 inline-flex border-2 border-black" type="text" value={password} onChange={e => setPassword(e.target.value)} />
                <button className="bg-slate-800 text-white p-3 inline-flex" onClick={openLock}>Open the Lock...</button>
            </>}
            {!query.data?.success && <>
                <Header>Empty Lock</Header>
                <p className="text-md"><span className="text-red-500">Nothing</span> to see here...</p> 
            </>}
        </div>
    )
}