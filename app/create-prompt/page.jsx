"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreatePrompt = () => {
	const router = useRouter();
	const { data: session } = useSession();
	// console.log(session?.user._id);
	const [submitting, setIsSubmitting] = useState(false);
	const [post, setPost] = useState({ prompt: "", tag: "" });

	const createPrompt = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const response = await fetch("/api/prompt/new", {
				method: "POST",
				body: JSON.stringify({
					prompt: post.prompt,
					// userId: session?.user._id,
					userId: "657be37e4ac4dc90b7a2e224",
					// userId: "6579b4fbe5b23457a9789ddb",

					tag: post.tag,
				}),
			});

			if (response.ok) {
				router.push("/");
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Form
			type="Create"
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={createPrompt}
		/>
	);
};

export default CreatePrompt;
