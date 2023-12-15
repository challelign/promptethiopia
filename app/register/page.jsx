"use client";
import FormRegister from "@components/FormRegister";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Register = () => {
	// const [name, setName] = useState("");
	// const [email, setEmail] = useState("");
	// const [password, setPassword] = useState("");
	// const [username, setUsername] = useState("");
	const [post, setPost] = useState({
		name: "",
		email: "",
		password: "",
		username: "",
	});
	const router = useRouter();

	const [submitting, setIsSubmitting] = useState(false);
	const createUser = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			const response = await fetch("/api/register", {
				method: "POST",
				body: JSON.stringify({
					name: post.name,
					email: post.email,
					password: post.password,
					username: post.username,
				}),
			});

			console.log(response);
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
		<>
			<FormRegister
				type="Create"
				post={post}
				setPost={setPost}
				submitting={submitting}
				handleSubmit={createUser}
			/>
		</>
	);
};

export default Register;
