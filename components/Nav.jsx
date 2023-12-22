"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
	const { data: session, status } = useSession();
	console.log("User From session=> ", session);
	console.log("User From session id=> ", session?.user.id);
	const isUserLoggedIn = true;
	const [providers, setProviders] = useState(null);
	const [toggleDropdown, setToggleDropdown] = useState(false);
	const userId = session?.user?.name;
	console.log(userId);
	useEffect(() => {
		(async () => {
			const res = await getProviders();
			setProviders(res);
		})();
	}, []);

	return (
		<nav className="flex-between w-full mb-16 pt-3">
			<Link href="/" className="flex gap-2 flex-center">
				<Image
					src="/assets/images/logo.svg"
					alt="logo"
					width={30}
					height={30}
					className="object-contain"
				/>
				<p className="logo_text">PrompEthiopia</p>
			</Link>
			<Link href="/register" className="black_btn">
				Register User
			</Link>
			{!session?.user ? (
				<Link href="/login" className="black_btn">
					Login Custom
				</Link>
			) : (
				""
			)}

			{/* Desktop Navigation */}
			<div className="sm:flex hidden">
				{session?.user ? (
					<div className="flex gap-3 md:gap-5">
						<Link href="/create-prompt" className="black_btn">
							Create Post
						</Link>

						<button type="button" onClick={signOut} className="outline_btn">
							Sign Out
						</button>

						<Link href="/profile">
							<Image
								// src={session?.user.image}
								src="/assets/images/user-icon.png"
								width={37}
								height={37}
								className="rounded-full"
								alt="profile"
							/>
						</Link>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<>
									{/* <button
										type="button"
										key={provider.name}
										onClick={() => {
											signIn(provider.id);
										}}
										className="black_btn"
									>
										{provider.name} Sign In
										Sign In
									</button> */}
									{provider.name === "google" ? (
										<button
											type="button"
											onClick={() => {
												signIn("credentials");
											}}
											className="black_btn"
										>
											Login Google
										</button>
									) : (
										""
									)}
									<button
										type="button"
										onClick={() => {
											signIn("github");
										}}
										className="black_btn"
									>
										Github Sign in
									</button>
									{provider.name === "credentials" ? (
										<button
											type="button"
											onClick={() => {
												signIn("credentials");
											}}
											className="black_btn"
										>
											Login Credentials
										</button>
									) : (
										""
									)}
								</>
							))}
					</>
				)}
			</div>

			{/* Mobile Navigation */}
			<div className="sm:hidden flex relative">
				{session?.user ? (
					<div className="flex">
						<Image
							// src={session?.user.image}
							src="/assets/images/user-icon.png"
							width={37}
							height={37}
							className="rounded-full"
							alt="profile"
							onClick={() => setToggleDropdown(!toggleDropdown)}
						/>

						{toggleDropdown && (
							<div className="dropdown">
								<Link
									href="/profile"
									className="dropdown_link"
									onClick={() => setToggleDropdown(false)}
								>
									My Profile
								</Link>
								<Link
									href="/create-prompt"
									className="dropdown_link"
									onClick={() => setToggleDropdown(false)}
								>
									Create Prompt
								</Link>
								<button
									type="button"
									onClick={() => {
										setToggleDropdown(false);
										signOut();
									}}
									className="mt-5 w-full black_btn"
								>
									Sign Out
								</button>
							</div>
						)}
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type="button"
									key={provider.name}
									onClick={() => {
										signIn(provider.id);
									}}
									className="black_btn"
								>
									Sign in
								</button>
							))}
					</>
				)}
			</div>
		</nav>
	);
};

export default Nav;
