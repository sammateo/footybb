"use client";

import { useUser } from "@auth0/nextjs-auth0";

export default function Profile() {
	const { user, isLoading } = useUser();
	return (
		<>
			{isLoading && <p>Loading...</p>}
			{user && (
				<div className="flex flex-col justify-center items-center gap-10 grow">
					<img
						src={user.picture}
						alt="Profile"
						style={{
							borderRadius: "50%",
							width: "80px",
							height: "80px",
						}}
					/>
					<h2>{user.name}</h2>
					<p>{user.email}</p>
					{/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
				</div>
			)}
		</>
	);
}
