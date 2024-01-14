import { signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import React from "react";
import { Page } from '~/components/page';

import { api } from '~/utils/api';


export default function Home() {
	const hello = api.post.hello.useQuery({ text: 'from tRPC' });
	return (<>
		<h1 className="text-5xl text-slate-700 p-5">Quandry</h1>
		<p> <span className="text-xl text-blue-500">Password Protected</span> URL Shortener</p>
	</>);
}