"use client";
import LoginForm from "@components/LoginForm";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
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
				toast.success("Login successfully", {
					duration: 3000,
				});
				router.push("/");
			} else {
				toast.success("Invalid Email or Password", {
					duration: 3000,
				});
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
