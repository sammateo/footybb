import { NewPlayerForm } from "@/components/forms/NewPlayerForm";
import Navigation from "@/components/navigation/Navigation";
import React from "react";
import { auth0 } from "@/lib/auth/auth0";
import { redirect } from "next/navigation";
export default async function page() {
	const session = await auth0.getSession();
	const user = session?.user;
	if (!user) {
		redirect("/");
	}
	return (
		<div>
			<Navigation />
			<div className="text-center py-10 px-10 md:px-20 flex justify-center items-center flex-wrap">
				<h1 className="text-2xl font-bold mb-4">New Player</h1>
			</div>
			<div className="px-10 md:px-20">
				<NewPlayerForm />
			</div>
		</div>
	);
}
