import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Header } from "~/components/typography";
import { api } from "~/utils/api";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Textarea, getKeyValue } from "@nextui-org/react";
import Link from "next/link";
import { url } from "inspector";

export default function Dashboard() {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        // Are we authenticated? 
        if (!session) void router.push("/auth/login")
    }, []);


    // Get all the user's URLS
    const urls = api.url.getAll.useQuery();

    const deleteUrl = api.url.delete.useMutation();

    const deleteUrlEvent = (id: number) => {
        // Show popup
        deleteUrl.mutate({ id: id.toString() });
        router.reload();
    }

    const rows = urls.data?.map(url => ({
        id: url.id,
        alias: url.alias,
        path: <span className="text-blue-300"><Link href={url.path}>{url.path}</Link></span>,
        url: <span className="text-blue-300"><Link href={`https://quandry.dearclarent.com/key/${url.id}`}>{`https://quandry.dearclarent.com/key/${url.id}`}</Link></span>,
        hint: <Textarea isReadOnly variant="bordered" defaultValue={url.hint} />,
        actions: <> <Button color="secondary">Edit</Button> <Button  onClick={() => deleteUrlEvent(url.id) } color="danger">{deleteUrl.isLoading ? "Loading..." : "Delete"}</Button></>
    }));

    const cols = [
        {
            key: "alias",
            label: "Alias",
        },
        {
            key: "path",
            label: "Path",
        },
        {
            key: "url",
            label: "Shortened Link",
        },
        {
            key: "hint",
            label: "Hint",
        },
        {
            key: "actions",
            label: "Actions",
        }
    ]

    return (
        <>
            <Header>Dashboard</Header>
            <div className="flex flex-col p-3 m-3">
                {urls.data && <Table aria-label="Example table with dynamic content">
                    <TableHeader columns={cols}>
                        {(col) => <TableColumn key={col.key}>{col.label}</TableColumn>}
                    </TableHeader>
                    <TableBody items={rows}>
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>}
            </div>
        </>
    )
}