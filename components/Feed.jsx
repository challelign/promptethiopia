"use client";
import React, { useEffect, useState } from "react";
import PromptCard from "@components/PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
	console.log("data =>>>>>>>>>", data);
	return (
		<div className="mt-5 prompt_layout">
			{data?.map((item) => (
				<PromptCard
					key={item._id}
					post={item}
					handleTagClick={handleTagClick}
				/>
			))}
		</div>
	);
};
const Feed = () => {
	const [posts, setPosts] = useState([]);

	// Search states
	const [searchText, setSearchText] = useState("");
	const [searchTimeout, setSearchTimeout] = useState(null);
	const [searchedResults, setSearchedResults] = useState([]);

	const filterPrompts = (search) => {
		const regex = new RegExp(search, "i"); // 'i' flag for case-insensitive search
		return posts.filter(
			(item) =>
				regex.test(item.creator.username) ||
				regex.test(item.creator.email) ||
				regex.test(item.tag) ||
				regex.test(item.prompt)
		);
	};
	const handleSearchChange = (e) => {
		e.preventDefault();
		clearTimeout(searchTimeout);
		setSearchText(e.target.value);

		// debounce method
		setSearchTimeout(
			setTimeout(() => {
				const searchResult = filterPrompts(e.target.value);
				setSearchedResults(searchResult);
			}, 500)
		);
	};
	const handleTagClick = (tagName) => {
		setSearchText(tagName);

		const searchResult = filterPrompts(tagName);
		setSearchedResults(searchResult);
	};
	useEffect(() => {
		const fetchPost = async () => {
			const response = await fetch("/api/prompt");
			const data = await response.json();
			setPosts(data);
		};
		// console.log("posts ===>", posts);
		fetchPost();
	}, []);

	return (
		<section className="feed">
			<form className="relative w-full flex-center">
				<input
					type="text"
					placeholder="Search for a tag or a username or email"
					value={searchText}
					onChange={handleSearchChange}
					required
					className="search_input peer"
				/>
			</form>

			<div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
				<div className="flex-center gap-5">
					<p className="prompt_layout font-satoshi font-semibold text-gray-900">
						Filter By Tag
					</p>
					<ul class="flex   -mb-px w-full">
						{posts?.map((tag) => (
							<li className="me-2 font-inter text-sm blue_gradient cursor-pointer">
								<a
									onClick={() => handleTagClick && handleTagClick(tag.tag)}
									class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
								>
									#{tag.tag}
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>

			{searchText ? (
				<PromptCardList
					data={searchedResults}
					handleTagClick={handleTagClick}
				/>
			) : (
				<PromptCardList data={posts} handleTagClick={handleTagClick} />
			)}
		</section>
	);
};

export default Feed;
