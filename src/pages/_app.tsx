import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { type AppType } from 'next/app';
import { useSession } from 'next-auth/react';
import { Page } from '~/components/page';
import { api } from '~/utils/api';
import { NextUIProvider } from "@nextui-org/react";
import Link from 'next/link';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import { signOut } from 'next-auth/react';


import '~/styles/globals.css';
import { useRouter } from 'next/router';

const NavLogo: React.FC = () => <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
	<path
		clipRule="evenodd"
		d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
		fill="currentColor"
		fillRule="evenodd"
	/>
</svg>

/**
 * Navbar
 * @author Arnab Ghosh
 * @date 1/13/2024
 * @returns React component of Navbar
 */
const Nav: React.FC = () => {
	/**
	 * Structural representation of a Navbar Page
	 * Includes the name of the page, its location, and if authentication is required
	 */
	class NavbarPage {
		name: string;
		location: string;
		authed: boolean;

		constructor(name: string, location: string, authed: boolean) {
			this.name = name;
			this.location = location;
			this.authed = authed;
		}
	}

	// Are we authenticated? 
	const { data: session } = useSession();
	const authed = !!session;

	// List of pages that we can navigate to
	const pages = [
		new NavbarPage("Dashboard", "/dashboard", true),
		new NavbarPage("Settings", "/settings", true),
		new NavbarPage("Add Link", "/link", true),
		new NavbarPage("Home", "/", false),
		new NavbarPage("About", "/about", false),
		new NavbarPage("Pricing", "/pricing", false)
	]

	return (
		<Navbar isBordered={true} isBlurred={true}>
			<NavbarBrand>
				<NavLogo />
				<p className="font-bold text-inherit">Quandry</p>
			</NavbarBrand>
			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				{pages.map(page => (authed && page.authed || !page.authed) &&  // TODO: Insert Current Page Logic
					// We should highlight what the current page is
					<NavbarItem key={page.location}>
						<Link color="foreground" href={page.location}>
							{page.name}
						</Link>
					</NavbarItem>
				)}
			</NavbarContent>
			{ /* The authentication links */}
			<NavbarContent justify="end">
				{authed ? 
					<NavbarItem className="hidden lg:flex">
						<Button color="primary" onClick={() => signOut()}>Signout</Button>
					</NavbarItem> :
					<NavbarItem className="hidden lg:flex">
						<Button as={Link} color="primary" variant="bordered" href="/auth/login">Login</Button>
					</NavbarItem>
				}

			</NavbarContent>
		</Navbar>
	)
}

const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	const router = useRouter();

	if(router.asPath.includes("key")) {
		return (
			<SessionProvider session={session}>
			<NextUIProvider>
				<Component {...pageProps} />
			</NextUIProvider>
		</SessionProvider>
		)
	}
	return (
		<SessionProvider session={session}>
			<NextUIProvider>
				<Nav />
				<Page>
					<Component {...pageProps} />
				</Page>
			</NextUIProvider>
		</SessionProvider>
	);
};

export default api.withTRPC(MyApp);
