import { NewTeamForm } from "@/components/forms/NewTeamForm";
import Navigation from "@/components/navigation/Navigation";
import { auth0 } from "@/lib/auth/auth0";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
	const session = await auth0.getSession();
	const user = session?.user;
	if (!user) {
		redirect("/");
	}
	return (
		<div>
			<Navigation />
			<div className="px-10 md:px-20 py-20">
				<h1 className="text-2xl font-bold mb-4">New Team</h1>
				<NewTeamForm />
			</div>
		</div>
	);
};

export default page;
