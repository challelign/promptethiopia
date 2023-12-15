import { connectToDB } from "@utils/database";
import User from "@models/user";
export const POST = async (request) => {
	const { name, email, password, username } = await request.json();
	// /* console.log("userId is =>", userId);
	const image = "sample image";
	console.log("name is =>", name);
	console.log("email is =>", email);
	console.log("password is =>", password);
	console.log("username is =>", username);

	try {
		await connectToDB();
		// const newUser = new User({ name, email, password, username, image });
		// const newUser = new User({ name, email });
		// console.log("newUser =>", newUser);
		// await newUser.create();

		// console.log("newUser =>", newUser);
		const userCreate = await User.create({ name, email, password });
		return new Response(JSON.stringify(userCreate), { status: 201 });
	} catch (error) {
		return new Response("Failed to create a   new User", { status: 500 });
	}
};
