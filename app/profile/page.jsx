"use client";
import React from "react";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
const MyProfile = () => {
	const { data: session } = useSession();
	const [posts, setPosts] = useState([]);
	const id = "657be37e4ac4dc90b7a2e224";
	const router = useRouter();

	// console.log(session?.user.email);
	useEffect(() => {
		const fetchPost = async () => {
			const response = await fetch(`/api/users/${id}/posts`);
			const data = await response.json();
			setPosts(data);
		};
		console.log("posts ===>", posts);

		if (session?.user.email) {
			fetchPost();
		}
	}, []);
	const handleEdit = (post) => {
		router.push(`/update-prompt?id=${post._id}`);
	};
	const handleDelete = async (post) => {
		const hasConfirmed = confirm(
			"Are you sure You want to delete this prompt ?"
		);
		if (hasConfirmed) {
			try {
				await fetch(`/api/prompt/${post._id.toString()}`, {
					method: "DELETE",
				});
				const filteredPosts = posts.filter((p) => p._id !== post._id);
				setPosts(filteredPosts);
			} catch (error) {
				console.log(error);
			}
		}
	};
	return (
		<Profile
			name="My"
			desc="Welcome to your personalize profile page"
			data={posts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	);
};

export default MyProfile;
