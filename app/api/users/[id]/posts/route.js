import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
	console.log(params?._id);
	try {
		await connectToDB();

		// const prompts = await Prompt.find({}).populate("creator");
		const user = await Prompt.find({ creator: params.id }).populate("creator");

		console.log("user data ====>", user);
		return new Response(JSON.stringify(user), { status: 200 });
	} catch (error) {
		return new Response("Failed to fetch all prompts", { status: 500 });
	}
};
