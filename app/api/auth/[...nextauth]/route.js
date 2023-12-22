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
			name: "Credentials",
			async authorize(credentials, req) {
				await connectToDB();

				const { email, password } = credentials;

				console.log(email, password);
				const user = await User.findOne({ email });

				if (!user) {
					throw new Error("Invalid Email or Password");
				}

				const isPasswordMatched = await bcrypt.compare(password, user.password);

				if (!isPasswordMatched) {
					throw new Error("Invalid Email or Password");
				}
				// Include the user ID in the session
				const sessionUser = {
					id: user._id.toString(),
					name: user.name,
					email: user.email,
					image: user.image,
					isAdmin: true,
				};
				console.log("sessionUser =>", sessionUser);

				// return user;
				// Return the user object with _id included
				return sessionUser;
			},
		}),
	],

	// callbacks: {
	// 	session: async ({ session, token, sessionUser }) => {
	// 		if (sessionUser.sessionUser) {
	// 			session.user._id = token._id;
	// 		}
	// 		return session;
	// 	},
	// },
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
		// async signIn({ account, profile, user, credentials }) {
		// 	try {
		// 		await connectToDB();

		// 		const existingUser = await User.findOne({ email: profile.email });

		// 		if (!existingUser) {
		// 			await User.create({
		// 				email: profile.email,
		// 				username: profile.name.replace(" ", "").toLowerCase(),
		// 				image: profile.picture,
		// 			});
		// 		}
		// 	} catch (error) {
		// 		console.error("Error during sign-in:", error);
		// 		// Handle the error appropriately, such as logging or displaying an error message.
		// 		return false; // Indicate sign-in failure
		// 	}

		// 	return true; // Indicate sign-in success
		// },

		// secret: process.env.NEXTAUTH_SECRET,
		// debug: process.env.NODE_ENV === "development",
	},

	// secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
