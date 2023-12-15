"use client";
import LoginForm from "@components/LoginForm";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
	const [post, setPost] = useState({
		email: "",
		password: "",
	});
	const [submitting, setIsSubmitting] = useState(false);
	console.log(post.email, post.password);
	const router = useRouter();
	const submitHandler = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			const data = await signIn("credentials", {
				redirect: false,
				email: post.email,
				password: post.password,
			});
			console.log(data);
			if (data.ok) {
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
			<LoginForm
				type="Login"
				post={post}
				setPost={setPost}
				submitting={submitting}
				handleSubmit={submitHandler}
			/>
		</>
	);
};

export default Login;
