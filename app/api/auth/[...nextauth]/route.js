import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

import User from "@models/user";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
	session: {
		strategy: "jwt",
	},
	providers: [
		// GoogleProvider({
		// 	clientId: process.env.GOOGLE_CLIENT_ID,
		// 	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		// }),
		// GitHubProvider({
		// 	clientId: process.env.GITHUB_ID,
		// 	clientSecret: process.env.GITHUB_SECRET,
		// }),
		CredentialsProvider({
			async authorize(credentials, req) {
				await connectToDB();

				const { email, password } = credentials;

				console.log(email, password);
				const user = await User.findOne({ email });

				console.log("user =>", { user });
				if (!user) {
					throw new Error("Invalid Email or Password");
				}

				const isPasswordMatched = await bcrypt.compare(password, user.password);

				if (!isPasswordMatched) {
					throw new Error("Invalid Email or Password");
				}

				// return user;
				// Include the user ID in the returned data
				const { _id, name, image } = user;
				return { _id, name, email, image };
			},
		}),
	],
	/* 
	callbacks: {
		async session({ session }) {
			try {
				await connectToDB();
				const sessionUser = await User.findOne({ email: session.user.email });

				if (sessionUser) {
					session.user.id = sessionUser._id.toString();
				}
			} catch (error) {
				console.error("Error retrieving session user:", error);
				// Handle the error appropriately, such as logging or displaying an error message.
			}

			return session;
		},
		async signIn({ account, profile, user, credentials }) {
			try {
				await connectToDB();

				const existingUser = await User.findOne({ email: profile.email });

				if (!existingUser) {
					await User.create({
						email: profile.email,
						username: profile.name.replace(" ", "").toLowerCase(),
						image: profile.picture,
					});
				}
			} catch (error) {
				console.error("Error during sign-in:", error);
				// Handle the error appropriately, such as logging or displaying an error message.
				return false; // Indicate sign-in failure
			}

			return true; // Indicate sign-in success
		},

		// secret: process.env.NEXTAUTH_SECRET,
		// debug: process.env.NODE_ENV === "development",
	}, */
	// callbacks: {
	// 	async session(session) {
	// 		const sessionUser = await User.findOne({
	// 			email: session.user.email,
	// 		});
	// 		session.user.id = sessionUser._id.toString();
	// 		return session;
	// 	},
	// },
	secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
