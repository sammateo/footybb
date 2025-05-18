// "use client";
// import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { auth0 } from "@/lib/auth/auth0";
import React from "react";

export default function Navigation() {
	const navigationItems = [
		{
			label: "Dashboard",
			link: "/dashboard",
		},
		{
			label: "Teams",
			link: "/teams",
		},
		{
			label: "Players",
			link: "/players",
		},
	];
	return (
		<div className="flex flex-wrap px-10 justify-between items-center gap-5 w-full">
			<Link href={"/"} className="px-5 py-4">
				FootyBB
			</Link>
			<div className="flex flex-wrap gap-2">
				{navigationItems.map((navigationItem, index) => (
					<Link
						className="px-5 py-4"
						key={index}
						href={navigationItem.link}
					>
						{navigationItem.label}
					</Link>
				))}
			</div>
			<LoginLogoutSection />
		</div>
	);
}

export const LoginLogoutSection = async () => {
	const session = await auth0.getSession();
	const user = session?.user;
	return (
		<div>
			{user && (
				<div className="flex items-center gap-5">
					<Link href={"/profile"}>
						<img
							className="w-10 h-10 object-cover rounded-full"
							src={user.picture}
							alt="user picture"
						/>
					</Link>
					<a
						href="/auth/logout"
						className="px-8 py-1 transition-colors duration-500 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-full"
					>
						Logout
					</a>
				</div>
			)}

			{!user && (
				<a
					className="px-8 py-1 transition-colors duration-500 border-2 bg-blue-600 text-white border-blue-600 hover:text-blue-600 hover:bg-white rounded-full "
					href="/auth/login"
				>
					Login
				</a>
			)}
		</div>
	);
};
