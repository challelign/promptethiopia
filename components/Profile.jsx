import { useSession } from "next-auth/react";
import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
	const { data: session } = useSession();
	console.log(session);
	return (
		<section className="w-full">
			<h1 head_text text-left>
				<span className="blue_gradient">
					{name}{" "}
					<span className="text-4xs text-red-500">{session?.user.name}</span>{" "}
					profile
				</span>
			</h1>

			<p className="desc text-left">{desc}</p>
			<div className="mt-10 prompt_layout">
				{session?.user.id ? (
					<>
						{data.map((item) => (
							<PromptCard
								key={item._id}
								post={item}
								handleEdit={() => handleEdit && handleEdit(item)}
								handleDelete={() => handleDelete && handleDelete(item)}
							/>
						))}
					</>
				) : (
					" No data"
				)}
			</div>
		</section>
	);
};

export default Profile;
