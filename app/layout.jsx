// "use client";
import "@styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
	title: "PrompEthiopia",
	description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }) => (
	<html lang="en">
		<body>
			<Provider>
				<div className="main">
					<div className="gradient" />
				</div>

				<main className="app">
					{/* <SessionProvider> */}
					<Nav />
					{children}
					{/* </SessionProvider> */}
				</main>
			</Provider>
		</body>
	</html>
);

export default RootLayout;
